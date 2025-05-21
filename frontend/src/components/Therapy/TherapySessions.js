import React, { useState, useEffect, useMemo } from "react";
import { Container, Card, Button, Row, Col, ProgressBar, Form, Alert } from "react-bootstrap";
import { FaMusic, FaHeartbeat, FaArrowLeft, FaHeadphones, FaGuitar, FaDrum, FaPlay, FaPause, FaLanguage } from "react-icons/fa";
import YouTube from 'react-youtube';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const defaultPatientData = {
  age: "N/A",
  pulseRate: "N/A",
  bloodPressure: "N/A",
  stressLevel: "N/A",
  musicCategory: "",
  meditationType: "guided",
  therapyTime: 15,
  gender: "N/A",
};

const getFrequency = (midiNote) => {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
};

const translations = {
  en: {
    musicTherapySession: "Music Therapy Session",
    selectCategory: "Select a music therapy category to begin.",
    listening: "Listening & Singing",
    instrumentalPlay: "Instrumental Play",
    therapeuticListening: "Therapeutic music listening exercises",
    instrumentalTherapy: "Instrumental music and rhythm therapy",
    backToCategories: "Back to Categories",
    sessionTitle: (category) => (category === "instrumentalPlay" ? "Instrumental Play" : category.charAt(0).toUpperCase() + category.slice(1)) + " Therapy",
    sessionDescription: (category) => `Enjoy your ${category === "instrumentalPlay" ? "instrumental play" : category} therapy with selected music.`,
    setMusicTaste: "Set Your Music Taste",
    selectPredefinedCategory: "Select a Predefined Category",
    chooseCategory: "Choose a category...",
    classicalMusic: "Classical Music",
    loFiBeats: "Lo-Fi Beats",
    instrumentalJazz: "Instrumental Jazz",
    acousticMusic: "Acoustic Music",
    natureSoundsWithMusic: "Nature Sounds with Music",
    ambientMusic: "Ambient Music",
    chantingMantras: "Chanting & Mantras",
    slowTempoPopRB: "Slow-tempo Pop & R&B",
    softRockFolk: "Soft Rock & Folk",
    binauralBeatsMeditationMusic: "Binaural Beats & Meditation Music",
    orEnterCategory: "Or Enter Your Preferred Music Category",
    placeholder: "Enter your preferred music category (e.g., rock, pop)",
    getSuggestions: "Get Song Suggestions",
    suggestedSongs: "Suggested Songs",
    selectSong: "Select a Song",
    chooseSong: "Choose a song...",
    videoNotAvailable: "Video not available for this song. Playing a placeholder instead.",
    timeRemaining: "Time Remaining",
    start: "Start",
    pause: "Pause",
    nextCategory: "Next Category",
    completeTherapy: "Complete Therapy",
    therapyProgress: "Therapy Progress",
    selectInstrumental: "Select an Instrumental Activity",
    drumming: "Drumming",
    keyboard: "Keyboard",
    guitar: "Guitar",
    drummingActivity: "Drumming Activity",
    tapAlong: "Tap along to the beat! Tap the button to match the rhythm.",
    tap: "Tap",
    totalTaps: (count) => `Keep tapping to the beat! Total taps: ${count}`,
    keyboardActivity: "Keyboard Activity",
    playNotes: "Use your PC keyboard to play notes! Press the keys C, D, E, F, G, A, or B to play the corresponding note.",
    tryScale: "Try playing a full scale: C-D-E-F-G-A-B!",
    guitarActivity: "Guitar Activity",
    practiceChords: "Practice basic chords. Click to hear and follow the guide.",
    cChord: "C Chord",
    cChordFingers: "Place fingers: 1st fret, 2nd string; 2nd fret, 4th string.",
    gChord: "G Chord",
    gChordFingers: "Place fingers: 3rd fret, 6th string; 2nd fret, 5th string.",
    switchChords: "Switch between C and G chords to practice!",
    language: "Language",
    english: "English",
    sinhala: "Sinhala",
    patientSummary: "Patient Summary",
    pulseRate: "Pulse Rate",
    bloodPressure: "Blood Pressure",
    stressLevel: "Stress Level",
    therapyTime: "Therapy Time (minutes)",
    bpmOverTime: "Pulse Rate Over Time (BPM)",
    bpmGraph: "BPM Graph",
    back: "Back",
    meditationTherapySession: "Meditation Therapy Session",
    selectMeditation: "Select a Meditation Type",
    mindfulnessMeditation: "Mindfulness Meditation",
    yogaBasedMeditation: "Yoga-Based Meditation",
    breathingMeditation: "Breathing Meditation",
    visualizationMeditation: "Visualization Meditation",
    bodyScanMeditation: "Body Scan Meditation",
    instructions: "Instructions",
  },
  si: {
    musicTherapySession: "සංගීත චිකිත්සාවේ සැසිය",
    selectCategory: "සංගීත චිකිත්සාවේ වර්ගයක් තෝරන්න.",
    listening: "සවන්දීම",
    instrumentalPlay: "යන්ත්‍ර තාක්ෂණික ඉදිරිපත් කිරීම",
    therapeuticListening: "සුවතාපය ලබා ගන්නා සංගීත ඇසීමේ ව්‍යාපෘති",
    instrumentalTherapy: "යන්ත්‍ර තාක්ෂණික සංගීත හා රිදම් චිකිත්සාව",
    backToCategories: "වර්ගයන් ආපසු යන්න",
    sessionTitle: (category) => (category === "instrumentalPlay" ? "යන්ත්‍ර තාක්ෂණික ඉදිරිපත් කිරීම" : category.charAt(0).toUpperCase() + category.slice(1)) + " චිකිත්සාව",
    sessionDescription: (category) => `විකල්ප තෝරාගත් සංගීතය සමඟ ඔබගේ ${category === "instrumentalPlay" ? "යන්ත්‍ර තාක්ෂණික ඉදිරිපත් කිරීම" : category} චිකිත්සාව භුක්ති විඳින්න.`,
    setMusicTaste: "ඔබගේ සංගීත රුචිය සකසන්න",
    selectPredefinedCategory: "පෙරනිමි වර්ගය තෝරන්න",
    chooseCategory: "වර්ගයක් තෝරන්න...",
    classicalMusic: "සම්ප්‍රදායික සංගීතය",
    loFiBeats: "ලෝ-ෆයි තාල",
    instrumentalJazz: "යන්ත්‍ර ජාස්",
    acousticMusic: "ධ්වනික සංගීතය",
    natureSoundsWithMusic: "පරිසර ශබ්ද සමඟ සංගීතය",
    ambientMusic: "පරිසර සංගීතය",
    chantingMantras: "ජපමාලා හා ධර්ම ගායන",
    slowTempoPopRB: "මන්දගාමී පොප් & ආර්බී",
    softRockFolk: "මෘදු රොක් & ජන සංගීතය",
    binauralBeatsMeditationMusic: "බයිනෝරල් තාල හා භාවනා සංගීතය",
    orEnterCategory: "හෝ ඔබගේ ප්‍රියතම සංගීත වර්ගය ඇතුල් කරන්න",
    placeholder: "ඔබගේ ප්‍රියතම සංගීත වර්ගය ඇතුල් කරන්න (උදා: රොක්, පොප්)",
    getSuggestions: "සංගීත යෝජනා ලබා ගන්න",
    suggestedSongs: "යෝජිත ගීත",
    selectSong: "ගීතයක් තෝරන්න",
    chooseSong: "ගීතයක් තෝරන්න...",
    videoNotAvailable: "මෙම ගීතය සඳහා වීඩියෝව නොමැත. ආදර්ශයක් භාවිතා කරමින් ඉදිරිපත් කරනු ලැබේ.",
    timeRemaining: "බාකම් ඉතිරිව ඇත",
    start: "ආරම්භය",
    pause: "විරාමය",
    nextCategory: "ලබන වර්ගය",
    completeTherapy: "චිකිත්සාව සම්පූර්ණ කරන්න",
    therapyProgress: "චිකිත්සාවේ ප්‍රගතිය",
    selectInstrumental: "යන්ත්‍ර තාක්ෂණික ක්‍රියාකාරකම තෝරන්න",
    drumming: "ඩම්මින්",
    keyboard: "කීබෝඩය",
    guitar: "ගිටාර්",
    drummingActivity: "ඩම්මින් ක්‍රියාකාරකම",
    tapAlong: "තාලයට ගැලපෙන පරිදි ටැප් කරන්න! ටැප් චොතන් භාවිතා කර රිදමට ගැලපෙන්න.",
    tap: "ටැප්",
    totalTaps: (count) => `තාලයට ටැප් කරගෙන යන්න! එකතු ටැප්: ${count}`,
    keyboardActivity: "කීබෝඩය ක්‍රියාකාරකම",
    playNotes: "PC කීබෝඩය භාවිතා කර තනු ගැයන්න! C, D, E, F, G, A, හෝ B යන යතුරු ඔබන්න.",
    tryScale: "සම්පූර්ණ පරිමාණයක් ගැයීමට උත්සාහ කරන්න: C-D-E-F-G-A-B!",
    guitarActivity: "ගිටාර් ක්‍රියාකාරකම",
    practiceChords: "මූලික තාල භාවිතා කර පුහුණුව. ඔබන්න හා උපදෙස් අනුව ඉදිරිපත් කරන්න.",
    cChord: "C තාලය",
    cChordFingers: "ඇඟිලි තැබීම: 1වන තාලය, 2වන තන්තුව; 2වන තාලය, 4වන තන්තුව.",
    gChord: "G තාලය",
    gChordFingers: "ඇඟිලි තැබීම: 3වන තාලය, 6වන තන්තුව; 2වන තාලය, 5වන තන්තුව.",
    switchChords: "C හා G තාල අතර එකතුවට යන්න!",
    language: "භාෂාව",
    english: "ඉංග්‍රීසි",
    sinhala: "සිංහල",
    patientSummary: "රෝගියාගේ සාරාංශය",
    pulseRate: "හෘද ස්පන්දන වේගය",
    bloodPressure: "ලේ පීඩනය",
    stressLevel: "මානසික ආතතිය",
    therapyTime: "චිකිත්සාවට ඇති කාලය (මිනිත්තු)",
    bpmOverTime: "කාලයත් සමඟ හෘද ස්පන්දන වේගය (BPM)",
    bpmGraph: "BPM ග්‍රැෆික්",
    back: "ආපසු",
    meditationTherapySession: "භාවනා චිකිත්සාවේ සැසිය",
    selectMeditation: "භාවනා වර්ගයක් තෝරන්න",
    mindfulnessMeditation: "සිහිකල්පනා භාවනාව",
    yogaBasedMeditation: "යෝග පාදක භාවනාව",
    breathingMeditation: "ශ්වසන භාවනාව",
    visualizationMeditation: "ප්‍රතිරූපන භාවනාව",
    bodyScanMeditation: "ශරීර ස්කෑන් භාවනාව",
    instructions: "උපදෙස්",
  },
};

const MusicTherapy = ({ patientData = defaultPatientData, onComplete, onBack, esp32Ip, bpm, setBpm, bpmHistory, setBpmHistory }) => {
  const [musicCategory, setMusicCategory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [musicTaste, setMusicTaste] = useState(patientData.musicCategory || "");
  const [songSuggestions, setSongSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [tapCount, setTapCount] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [activeNote, setActiveNote] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [language, setLanguage] = useState("en");
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  const t = translations[language];
  const segmentTime = Math.floor((patientData.therapyTime * 60) / 2);

  const fetchBPM = async () => {
    try {
      const response = await fetch(`http://${esp32Ip}/getBPM`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const bpmValue = await response.text();
        const parsedBpm = parseInt(bpmValue);
        if (bpmValue && parsedBpm > 0) {
          setBpm(parsedBpm);
          setBpmHistory((prev) => [...prev, { time: new Date().toLocaleTimeString(), bpm: parsedBpm }].slice(-20));
          setConnectionStatus(`Connected (${parsedBpm} BPM)`);
        } else {
          setConnectionStatus('No valid pulse detected');
          const mockBpm = 72;
          setBpm(mockBpm);
          setBpmHistory((prev) => [...prev, { time: new Date().toLocaleTimeString(), bpm: mockBpm }].slice(-20));
          setConnectionStatus(`Mock Data (${mockBpm} BPM)`);
        }
      } else {
        setConnectionStatus('Error connecting to sensor');
      }
    } catch (error) {
      setConnectionStatus('Connection failed');
    }
  };

  useEffect(() => {
    fetchBPM();
    const interval = setInterval(fetchBPM, 2000);
    return () => clearInterval(interval);
  }, []);

  const allCategories = [
    "classicalMusic",
    "loFiBeats",
    "instrumentalJazz",
    "acousticMusic",
    "natureSoundsWithMusic",
    "ambientMusic",
    "chantingMantras",
    "slowTempoPopRB",
    "softRockFolk",
    "binauralBeatsMeditationMusic",
  ];

  const randomCategories = useMemo(() => {
    const shuffled = [...allCategories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, []);

  const noteMap = {
    c: { midi: 60, note: "C" },
    d: { midi: 62, note: "D" },
    e: { midi: 64, note: "E" },
    f: { midi: 65, note: "F" },
    g: { midi: 67, note: "G" },
    a: { midi: 69, note: "A" },
    b: { midi: 71, note: "B" },
  };

  const playNote = (keyData) => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);
    }

    const ctx = audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(getFrequency(keyData.midi), ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.5);

    setActiveNote(keyData.note);
    setTimeout(() => setActiveNote(null), 200);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (musicCategory !== "instrumentalPlay" || selectedInstrument !== "keyboard") return;
      const key = event.key.toLowerCase();
      if (noteMap[key]) {
        playNote(noteMap[key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [musicCategory, selectedInstrument, audioContext]);

  useEffect(() => {
    let timer;
    if (isPlaying && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isPlaying) {
      setIsPlaying(false);
      if (musicCategory === "listening" && youtubePlayer) youtubePlayer.pauseVideo();
      if (musicCategory === "instrumentalPlay" && audioPlayer) audioPlayer.pause();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeRemaining, youtubePlayer, audioPlayer, musicCategory]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const categoryIcons = {
    listening: <FaHeadphones size={30} />,
    instrumentalPlay: <FaGuitar size={30} />,
  };

  const handleCategorySelect = (category) => {
    setMusicCategory(category);
    setTimeRemaining(segmentTime);
    setCurrentStage(1);
    setSelectedInstrument(null);
    setTapCount(0);
    setActiveNote(null);
  };

  const handleStartActivity = () => {
    setIsPlaying(true);
    if (musicCategory === "listening" && youtubePlayer) {
      youtubePlayer.playVideo();
    } else if (musicCategory === "instrumentalPlay" && audioPlayer) {
      audioPlayer.play();
    }
  };

  const handlePauseActivity = () => {
    setIsPlaying(false);
    if (musicCategory === "listening" && youtubePlayer) {
      youtubePlayer.pauseVideo();
    } else if (musicCategory === "instrumentalPlay" && audioPlayer) {
      audioPlayer.pause();
    }
  };

  const handleCompleteActivity = () => {
    if (musicCategory === "instrumentalPlay") {
      onComplete();
    } else {
      setMusicCategory("instrumentalPlay");
      setIsPlaying(false);
      setSelectedSong(null);
      setTimeRemaining(segmentTime);
      setCurrentStage(1);
      setSelectedInstrument(null);
      setTapCount(0);
      setActiveNote(null);
      if (youtubePlayer) youtubePlayer.pauseVideo();
    }
  };

  const getProgressPercentage = () => {
    const remainingPercentage = (timeRemaining / segmentTime) * 100;
    return 100 - remainingPercentage;
  };

  const onYouTubeReady = (event) => {
    setYoutubePlayer(event.target);
  };

  const handleMusicTasteSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/song-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ music_category: musicTaste }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch song suggestions');
      }

      const data = await response.json();
      const suggestions = data.suggestions.map(song => ({
        title: song.title,
        youtubeId: song.youtubeId,
        audioUrl: song.audioUrl || (song.youtubeId === "dQw4w9WgXcQ" ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" : `https://example.com/audio/${song.youtubeId}.mp3`)
      }));
      setSongSuggestions(suggestions);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePredefinedCategorySelect = (category) => {
    setMusicTaste(category);
    handleMusicTasteSubmit({ preventDefault: () => {} });
  };

  if (currentStage === 0) {
    return (
      <Container className="mt-4">
        <Card className="p-4">
          <Button variant="outline-secondary" onClick={onBack}>
            <FaArrowLeft className="me-2" /> {t.back}
          </Button>
          <h2 className="text-center my-3">
            <FaMusic className="me-2" /> {t.musicTherapySession}
          </h2>
          <p className="text-center">
            {t.selectCategory}
          </p>
          <div className="d-flex justify-content-end mb-3">
            <Form.Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ width: '150px' }}
            >
              <option value="en">{t.english}</option>
              <option value="si">{t.sinhala}</option>
            </Form.Select>
          </div>
          <Row className="mt-4">
            {["listening", "instrumentalPlay"].map((category) => (
              <Col md={6} key={category} className="mb-3">
                <Card
                  className="text-center p-3 h-100 cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="mb-3">
                    {categoryIcons[category]}
                  </div>
                  <h4 className="text-capitalize">{t[category]}</h4>
                  <p className="small text-muted">
                    {category === "listening" && t.therapeuticListening}
                    {category === "instrumentalPlay" && t.instrumentalTherapy}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <Button variant="outline-secondary" onClick={() => setCurrentStage(0)}>
          <FaArrowLeft className="me-2" /> {t.backToCategories}
        </Button>
        <h2 className="text-center my-3">
          {categoryIcons[musicCategory]} {t.sessionTitle(musicCategory)}
        </h2>
        <div className="d-flex justify-content-end mb-3">
          <Form.Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="en">{t.english}</option>
            <option value="si">{t.sinhala}</option>
          </Form.Select>
        </div>

        <Card className="mb-4 p-3">
          <h4>{t.sessionTitle(musicCategory)}</h4>
          <p>{t.sessionDescription(musicCategory)}</p>
        </Card>

        {musicCategory === "listening" && (
          <Card className="p-3 mb-4">
            <h4>{t.setMusicTaste}</h4>
            <Form.Group className="mb-3">
              <Form.Label>{t.selectPredefinedCategory}</Form.Label>
              <Form.Select
                value={musicTaste}
                onChange={(e) => handlePredefinedCategorySelect(e.target.value)}
              >
                <option value="">{t.chooseCategory}</option>
                {randomCategories.map((category) => (
                  <option key={category} value={category}>
                    {t[category]}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form onSubmit={handleMusicTasteSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>{t.orEnterCategory}</Form.Label>
                <Form.Control
                  type="text"
                  value={musicTaste}
                  onChange={(e) => setMusicTaste(e.target.value)}
                  placeholder={t.placeholder}
                />
              </Form.Group>
              <Button type="submit" variant="primary">{t.getSuggestions}</Button>
            </Form>
            {error && <p className="text-danger mt-3">{error}</p>}
            {songSuggestions.length > 0 && (
              <div className="mt-3">
                <h5>{t.suggestedSongs}</h5>
                <ul>
                  {songSuggestions.map((song, index) => (
                    <li key={index}>{song.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        )}

        {musicCategory === "instrumentalPlay" && (
          <Card className="p-3 mb-4">
            <h4>{t.selectInstrumental}</h4>
            <Row className="mb-3">
              <Col md={4}>
                <Button
                  variant={selectedInstrument === "drumming" ? "success" : "outline-success"}
                  onClick={() => setSelectedInstrument("drumming")}
                  className="w-100 mb-2"
                >
                  <FaDrum /> {t.drumming}
                </Button>
              </Col>
              <Col md={4}>
                <Button
                  variant={selectedInstrument === "keyboard" ? "success" : "outline-success"}
                  onClick={() => setSelectedInstrument("keyboard")}
                  className="w-100 mb-2"
                >
                  {t.keyboard}
                </Button>
              </Col>
              <Col md={4}>
                <Button
                  variant={selectedInstrument === "guitar" ? "success" : "outline-success"}
                  onClick={() => setSelectedInstrument("guitar")}
                  className="w-100 mb-2"
                >
                  <FaGuitar /> {t.guitar}
                </Button>
              </Col>
            </Row>

            {selectedInstrument === "drumming" && (
              <div>
                <h5>{t.drummingActivity}</h5>
                <p>{t.tapAlong}</p>
                <audio ref={(node) => setAudioPlayer(node)} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" loop />
                <Button
                  variant="primary"
                  onClick={() => {
                    setTapCount((prev) => prev + 1);
                    if (audioPlayer && !isPlaying) {
                      audioPlayer.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="mb-2"
                >
                  {t.tap} <span className="badge bg-secondary">{tapCount}</span>
                </Button>
                <p>{t.totalTaps(tapCount)}</p>
              </div>
            )}

            {selectedInstrument === "keyboard" && (
              <div>
                <h5>{t.keyboardActivity}</h5>
                <p>{t.playNotes}</p>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  {["C", "D", "E", "F", "G", "A", "B"].map((note) => (
                    <Button
                      key={note}
                      variant={activeNote === note ? "success" : "outline-primary"}
                      style={{
                        width: "50px",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                      disabled
                    >
                      {note}
                    </Button>
                  ))}
                </div>
                <p>{t.tryScale}</p>
              </div>
            )}

            {selectedInstrument === "guitar" && (
              <div>
                <h5>{t.guitarActivity}</h5>
                <p>{t.practiceChords}</p>
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      const audio = new Audio(`https://example.com/chords/C.mp3`);
                      audio.play();
                    }}
                  >
                    {t.cChord}
                  </Button>
                  <p>{t.cChordFingers}</p>
                </div>
                <div>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      const audio = new Audio(`https://example.com/chords/G.mp3`);
                      audio.play();
                    }}
                  >
                    {t.gChord}
                  </Button>
                  <p>{t.gChordFingers}</p>
                </div>
                <p>{t.switchChords}</p>
              </div>
            )}
          </Card>
        )}

        {musicCategory === "listening" && (
          <div className="mb-4">
            <h5>{t.selectSong}</h5>
            <Form.Select
              className="mb-3"
              onChange={(e) => {
                const song = songSuggestions[e.target.value];
                setSelectedSong(song);
              }}
            >
              <option value="">{t.chooseSong}</option>
              {songSuggestions.map((song, index) => (
                <option key={index} value={index}>
                  {song.title} {!song.youtubeId && `(${t.videoNotAvailable})`}
                </option>
              ))}
            </Form.Select>

            {selectedSong && (
              <>
                {!selectedSong.youtubeId && (
                  <Alert variant="warning">
                    {t.videoNotAvailable}
                  </Alert>
                )}
                <YouTube
                  videoId={selectedSong.youtubeId || "dQw4w9WgXcQ"}
                  opts={{
                    height: '200',
                    width: '100%',
                    playerVars: { autoplay: 0, controls: 1, modestbranding: 1 },
                  }}
                  onReady={onYouTubeReady}
                  onError={(e) => console.log("YouTube Error:", e)}
                />
              </>
            )}
          </div>
        )}

        <div className="mb-3">
          <h5 className="text-center">{t.timeRemaining}: {formatTime(timeRemaining)}</h5>
          <ProgressBar
            now={getProgressPercentage()}
            variant={
              getProgressPercentage() < 33 ? "success" :
              getProgressPercentage() < 66 ? "warning" : "danger"
            }
            className="mt-2"
          />
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          {!isPlaying ? (
            <Button
              variant="success"
              onClick={handleStartActivity}
              disabled={musicCategory === "instrumentalPlay" ? !selectedInstrument : !selectedSong}
            >
              {t.start}
            </Button>
          ) : (
            <Button variant="warning" onClick={handlePauseActivity}>
              {t.pause}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleCompleteActivity}
            disabled={timeRemaining > 0 && isPlaying}
          >
            {musicCategory === "instrumentalPlay" ? t.completeTherapy : t.nextCategory}
          </Button>
        </div>

        <Row className="mt-4">
          <Col>
            <Card className="p-3 bg-light">
              <h5 className="text-center">{t.therapyProgress}</h5>
              <div className="d-flex justify-content-between mt-3">
                <div className={`text-center ${musicCategory === "listening" ? "fw-bold" : ""}`}>
                  <FaHeadphones size={20} className="mb-2" />
                  <div>{t.listening}</div>
                </div>
                <div className={`text-center ${musicCategory === "instrumentalPlay" ? "fw-bold" : ""}`}>
                  <FaGuitar size={20} className="mb-2" />
                  <div>{t.instrumentalPlay}</div>
                </div>
              </div>
              <ProgressBar className="mt-3">
                <ProgressBar variant="success" now={50} key={1} style={{ opacity: musicCategory === "listening" ? 1 : 0.3 }} />
                <ProgressBar variant="warning" now={50} key={2} style={{ opacity: musicCategory === "instrumentalPlay" ? 1 : 0.3 }} />
              </ProgressBar>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

const MeditationTherapy = ({ patientData = defaultPatientData, onComplete, onBack, esp32Ip, bpm, setBpm, bpmHistory, setBpmHistory }) => {
  const getRandomTime = () => {
    const minMinutes = 12;
    const maxMinutes = 18;
    return Math.floor(Math.random() * (maxMinutes - minMinutes + 1) + minMinutes) * 60;
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(getRandomTime());
  const [selectedMeditation, setSelectedMeditation] = useState("");
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [language, setLanguage] = useState("en");
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speech is active

  const t = translations[language];

  const meditationTypes = [
    { name: "mindfulnessMeditation", key: "mindfulnessMeditation" },
    { name: "yogaBasedMeditation", key: "yogaBasedMeditation" },
    { name: "breathingMeditation", key: "breathingMeditation" },
    { name: "visualizationMeditation", key: "visualizationMeditation" },
    { name: "bodyScanMeditation", key: "bodyScanMeditation" },
  ];

  const meditationInstructions = {
    mindfulnessMeditation: [
      "Sit comfortably with a straight posture and close your eyes.",
      "Focus on your breath, bodily sensations, or sounds around you.",
      "If your mind wanders, gently bring your attention back to the present moment.",
    ],
    yogaBasedMeditation: [
      "Perform slow yoga postures while focusing on your breath and body movements.",
      "Stay present in each pose, holding it for a few breaths to deepen relaxation.",
      "End with a seated or lying meditation to absorb the calming effects.",
    ],
    breathingMeditation: [
      "Sit or lie down comfortably and close your eyes.",
      "Take slow, deep breaths, inhaling through the nose and exhaling through the mouth.",
      "Focus on each breath, letting go of distractions and relaxing the body.",
    ],
    visualizationMeditation: [
      "Close your eyes and imagine a peaceful place like a beach, forest, or mountaintop.",
      "Engage all senses by visualizing colors, hearing sounds, and feeling textures.",
      "Stay immersed in the scene, allowing stress to fade and relaxation to deepen.",
    ],
    bodyScanMeditation: [
      "Lie down in a comfortable position and close your eyes.",
      "Slowly bring awareness to each part of your body, from head to toe, noticing tension.",
      "Breathe deeply and mentally relax each area before moving to the next.",
    ],
  };

  const randomMeditations = useMemo(() => {
    const shuffled = [...meditationTypes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  const fetchBPM = async () => {
    try {
      const response = await fetch(`http://${esp32Ip}/getBPM`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const bpmValue = await response.text();
        const parsedBpm = parseInt(bpmValue);
        if (bpmValue && parsedBpm > 0) {
          setBpm(parsedBpm);
          setBpmHistory((prev) => [...prev, { time: new Date().toLocaleTimeString(), bpm: parsedBpm }].slice(-20));
          setConnectionStatus(`Connected (${parsedBpm} BPM)`);
        } else {
          setConnectionStatus('No valid pulse detected');
          const mockBpm = 72;
          setBpm(mockBpm);
          setBpmHistory((prev) => [...prev, { time: new Date().toLocaleTimeString(), bpm: mockBpm }].slice(-20));
          setConnectionStatus(`Mock Data (${mockBpm} BPM)`);
        }
      } else {
        setConnectionStatus('Error connecting to sensor');
      }
    } catch (error) {
      setConnectionStatus('Connection failed');
    }
  };

  useEffect(() => {
    fetchBPM();
    const interval = setInterval(fetchBPM, 2000);
    return () => clearInterval(interval);
  }, []);

  const speakInstruction = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const calmVoice = voices.find(voice => voice.name.includes("Google US English") || voice.name.includes("Female")) || voices[0];
    utterance.voice = calmVoice;
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error("SpeechSynthesis Error:", event);
      setIsSpeaking(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    let timer;
    let instructionTimer;

    if (isPlaying && timeRemaining > 0) {
      // Timer for countdown
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Instruction change every 5 seconds
      instructionTimer = setInterval(() => {
        if (selectedMeditation && !isSpeaking) { // Only change if not speaking
          const instructions = meditationInstructions[selectedMeditation];
          setCurrentInstructionIndex((prev) => {
            const nextIndex = (prev + 1) % instructions.length;
            speakInstruction(instructions[nextIndex]);
            return nextIndex;
          });
        }
      }, 5000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(instructionTimer);
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, [isPlaying, timeRemaining, selectedMeditation, isSpeaking]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <Button variant="outline-secondary" onClick={onBack}>
          <FaArrowLeft className="me-2" /> {t.back}
        </Button>
        <h2 className="text-center my-3">
          <FaHeartbeat className="me-2" /> {t.meditationTherapySession}
        </h2>
        <div className="d-flex justify-content-end mb-3">
          <Form.Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="en">{t.english}</option>
            <option value="si">{t.sinhala}</option>
          </Form.Select>
        </div>

        <h5>{t.selectMeditation}</h5>
        <Row className="mb-4">
          {randomMeditations.map((meditation) => (
            <Col md={4} key={meditation.key} className="mb-2">
              <Button
                variant={selectedMeditation === meditation.key ? "success" : "outline-success"}
                className="w-100"
                onClick={() => {
                  setSelectedMeditation(meditation.key);
                  setCurrentInstructionIndex(0);
                  setTimeRemaining(getRandomTime());
                  if (isPlaying) setIsPlaying(false); // Reset playing state
                }}
              >
                {t[meditation.key]}
              </Button>
            </Col>
          ))}
        </Row>

        <h3 className="text-center">{formatTime(timeRemaining)}</h3>

        {selectedMeditation && (
          <Card className="mt-3 p-3 text-center bg-light">
            <h5>{t.instructions}</h5>
            <p className="fs-5">
              {isPlaying
                ? meditationInstructions[selectedMeditation][currentInstructionIndex]
                : meditationInstructions[selectedMeditation][0]}
            </p>
          </Card>
        )}

        <div className="d-flex justify-content-center gap-3 mt-4">
          {!isPlaying ? (
            <Button
              variant="success"
              onClick={() => {
                setIsPlaying(true);
                speakInstruction(meditationInstructions[selectedMeditation][0]); // Speak first instruction on start
              }}
              disabled={!selectedMeditation}
            >
              {t.start}
            </Button>
          ) : (
            <Button variant="warning" onClick={() => setIsPlaying(false)}>
              {t.pause}
            </Button>
          )}
          <Button variant="secondary" onClick={onComplete} disabled={timeRemaining > 0}>
            {t.completeTherapy}
          </Button>
        </div>

        {!isPlaying && selectedMeditation && (
          <Card className="mt-4 p-3 bg-light">
            <h5>{t[selectedMeditation]}</h5>
            <ul>
              {meditationInstructions[selectedMeditation].map((instr, index) => (
                <li key={index}>{instr}</li>
              ))}
            </ul>
          </Card>
        )}
      </Card>
    </Container>
  );
};

const TherapyNavigation = () => {
  const [currentTherapy, setCurrentTherapy] = useState(null);
  const [completedTherapies, setCompletedTherapies] = useState([]);
  const [patientData, setPatientData] = useState(defaultPatientData);
  const [bpm, setBpm] = useState(null);
  const [bpmHistory, setBpmHistory] = useState([]);
  const [showBpmGraph, setShowBpmGraph] = useState(false);
  const [language, setLanguage] = useState("en");
  const ESP32_IP = '192.168.1.184';

  const t = translations[language];

  useEffect(() => {
    const storedData = localStorage.getItem('patientData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setPatientData({ ...defaultPatientData, ...parsedData });
      } catch (error) {
        console.error("Error parsing stored patient data:", error);
      }
    }
  }, []);

  const fetchBPM = async () => {
    try {
      const response = await fetch(`http://${ESP32_IP}/getBPM`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const bpmValue = await response.text();
        const parsedBpm = parseInt(bpmValue);
        if (bpmValue && parsedBpm > 0) {
          setBpm(parsedBpm);
          setBpmHistory((prev) => [...prev, { time: new Date().toLocaleTimeString(), bpm: parsedBpm }].slice(-20));
        } else {
          const mockBpm = 72;
          setBpm(mockBpm);
          setBpmHistory((prev) => [...prev, { time: new Date().toLocaleTimeString(), bpm: mockBpm }].slice(-20));
        }
      }
    } catch (error) {
      console.error('Error fetching BPM:', error);
    }
  };

  useEffect(() => {
    fetchBPM();
    const interval = setInterval(fetchBPM, 2000);
    return () => clearInterval(interval);
  }, []);

  const bpmChartData = {
    labels: bpmHistory.map((entry) => entry.time),
    datasets: [
      {
        label: t.bpmOverTime,
        data: bpmHistory.map((entry) => entry.bpm),
        fill: false,
        borderColor: '#e74c3c',
        tension: 0.1,
      },
    ],
  };

  const bpmChartOptions = {
    scales: {
      x: {
        title: { display: true, text: 'Time' },
      },
      y: {
        title: { display: true, text: 'BPM' },
        beginAtZero: false,
        suggestedMin: 40,
        suggestedMax: 120,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  const handleComplete = (therapy) => {
    setCompletedTherapies([...completedTherapies, therapy]);
    setCurrentTherapy(null);
  };

  if (currentTherapy === "music") {
    return (
      <MusicTherapy
        patientData={patientData}
        onComplete={() => handleComplete("music")}
        onBack={() => setCurrentTherapy(null)}
        esp32Ip={ESP32_IP}
        bpm={bpm}
        setBpm={setBpm}
        bpmHistory={bpmHistory}
        setBpmHistory={setBpmHistory}
      />
    );
  }

  if (currentTherapy === "meditation") {
    return (
      <MeditationTherapy
        patientData={patientData}
        onComplete={() => handleComplete("meditation")}
        onBack={() => setCurrentTherapy(null)}
        esp32Ip={ESP32_IP}
        bpm={bpm}
        setBpm={setBpm}
        bpmHistory={bpmHistory}
        setBpmHistory={setBpmHistory}
      />
    );
  }

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h2 className="text-center">Select Therapy</h2>
        <div className="d-flex justify-content-end mb-3">
          <Form.Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="en">{t.english}</option>
            <option value="si">{t.sinhala}</option>
          </Form.Select>
        </div>
        <Row className="mt-3">
          <Col md={6}>
            <Card className="p-3 text-center">
              <FaMusic size={30} className="mb-2" />
              <h4>Music Therapy</h4>
              <p className="text-muted mb-3">Personalized therapeutic music activities</p>
              {completedTherapies.includes("music") ? (
                <p className="text-success">Completed!</p>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setCurrentTherapy("music")}
                >
                  Start Music Therapy
                </Button>
              )}
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-3 text-center">
              <FaHeartbeat size={30} className="mb-2" />
              <h4>Meditation Therapy</h4>
              <p className="text-muted mb-3">Guided meditation practices for relaxation and mental wellness</p>
              {completedTherapies.includes("meditation") ? (
                <p className="text-success">Completed!</p>
              ) : (
                <Button variant="info" onClick={() => setCurrentTherapy("meditation")}>
                  Start Meditation Therapy
                </Button>
              )}
            </Card>
          </Col>
        </Row>
        <Card className="p-3 mt-4">
          <h4>{t.patientSummary}</h4>
          <Row>
            <Col md={3}>
              <p><strong>{t.pulseRate}:</strong> {patientData.pulseRate}</p>
            </Col>
            <Col md={3}>
              <p><strong>{t.bloodPressure}:</strong> {patientData.bloodPressure}</p>
            </Col>
            <Col md={3}>
              <p><strong>{t.stressLevel}:</strong> {patientData.stressLevel}</p>
            </Col>
          </Row>
        </Card>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="secondary"
            onClick={() => setShowBpmGraph(!showBpmGraph)}
          >
            {t.bpmGraph} {showBpmGraph ? "▲" : "▼"}
          </Button>
        </div>
        {showBpmGraph && (
          <Card className="p-3 mt-4">
            <h4>{t.bpmOverTime}</h4>
            {bpmHistory.length > 1 ? (
              <div className="mt-3">
                <Line data={bpmChartData} options={bpmChartOptions} />
              </div>
            ) : (
              <p className="text-muted mt-3">Waiting for BPM data to display graph...</p>
            )}
          </Card>
        )}
      </Card>
    </Container>
  );
};

export default TherapyNavigation;