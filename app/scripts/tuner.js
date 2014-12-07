define([], function () {
  'use strict'

  var recording,
  buffer = [],
  sample_length_milliseconds,
  audio_context,
  microphone,
  script_processor,
  correlation_worker,
  test_frequencies

  var tuner = {
    init: function () {

      // Define the set of test frequencies that we'll use to analyze microphone data.
      var C2 = 65.41; // C2 note, in Hz.
      var notes = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];
      test_frequencies = [];
      for (var i = 0; i < 30; i++)
      {
        var note_frequency = C2 * Math.pow(2, i / 12);
        var note_name = notes[i % 12];
        var note = { "frequency": note_frequency, "name": note_name };
        var just_above = { "frequency": note_frequency * Math.pow(2, 1 / 48), "name": note_name + " (a bit sharp)" };
        var just_below = { "frequency": note_frequency * Math.pow(2, -1 / 48), "name": note_name + " (a bit flat)" };
        test_frequencies = test_frequencies.concat([ just_below, note, just_above ]);
      }

      correlation_worker = new Worker("scripts/correlation_worker.js");
      correlation_worker.addEventListener("message", tuner.interpret_correlation_result);

      if (!recording) {
        var get_user_media = navigator.getUserMedia;
        get_user_media = get_user_media || navigator.webkitGetUserMedia;
        get_user_media = get_user_media || navigator.mozGetUserMedia;
        get_user_media.call(navigator, { "audio": true }, tuner.use_stream, function() {});
      }
    },

    use_stream: function(stream) {
      audio_context = new AudioContext();
      microphone = audio_context.createMediaStreamSource(stream);
      script_processor = audio_context.createScriptProcessor(1024, 1, 1);

      script_processor.connect(audio_context.destination);
      microphone.connect(script_processor);

      buffer = [];
      sample_length_milliseconds = 100;
      recording = true;
      script_processor.onaudioprocess = tuner.capture_audio;
    },

    capture_audio: function(event) {
      if (!recording)
        return;

      buffer = buffer.concat(Array.prototype.slice.call(event.inputBuffer.getChannelData(0)));

      // Stop recording after sample_length_milliseconds.
      if (buffer.length > sample_length_milliseconds * audio_context.sampleRate / 1000)
      {
        recording = false;

        correlation_worker.postMessage
        (
          {
            "timeseries": buffer,
            "test_frequencies": test_frequencies,
            "sample_rate": audio_context.sampleRate
          }
        );

        buffer = [];
        setTimeout(function() { recording = true; }, 250);
      }
    },

    interpret_correlation_result: function (event) {
      var timeseries = event.data.timeseries;
      var frequency_amplitudes = event.data.frequency_amplitudes;

      // Compute the (squared) magnitudes of the complex amplitudes for each
      // test frequency.
      var magnitudes = frequency_amplitudes.map(function(z) { return z[0] * z[0] + z[1] * z[1]; });

      // Find the maximum in the list of magnitudes.
      var maximum_index = -1;
      var maximum_magnitude = 0;
      for (var i = 0; i < magnitudes.length; i++)
      {
        if (magnitudes[i] <= maximum_magnitude)
          continue;

        maximum_index = i;
        maximum_magnitude = magnitudes[i];
      }

      // Compute the average magnitude. We'll only pay attention to frequencies
      // with magnitudes significantly above average.
      var average = magnitudes.reduce(function(a, b) { return a + b; }, 0) / magnitudes.length;
      var confidence = maximum_magnitude / average;
      var confidence_threshold = 10; // empirical, arbitrary.
      if (confidence > confidence_threshold)
      {
        var dominant_frequency = test_frequencies[maximum_index];
        document.getElementById("note-name").textContent = dominant_frequency.name;
        document.getElementById("frequency").textContent = dominant_frequency.frequency;
      }
    }
  }

  return tuner
})
