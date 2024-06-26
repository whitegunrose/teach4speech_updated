import { useEffect, useState } from "react";
import { SocketConsumer } from "../utils/SocketProvider";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Container, Box, Typography, Chip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TranslationButton from "../components/TranslationButton";
import CircularCountdown from "../components/CircularCountdown";
import RelatedWordsBackground from "./RelatedWordsBackground";

function RelatedWordsGame() {
  const socket = SocketConsumer();
  const gameCode = useParams().gameCode as string;
  const theme = useParams().theme as string;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [isEnglish, setIsEnglish] = useState(localStorage.getItem('language') === "en");
  const [isDone, setIsDone] = useState(false);
  const [gameData, setGameData] = useState<any>({});
  const [yourAnswers, setYourAnswers] = useState<Array<string>>([]);
  const navigate = useNavigate()
  useEffect(() => {
    
    const storedLanguage = localStorage.getItem('language');
    setIsEnglish(storedLanguage === "en");
  }, []);

  useEffect(() => {
    socket.off('end_game');
    socket.off('game_restarted');
    socket.on('end_game', (data: any) => {
      setGameData(data);
      setIsDone(true);
    });

    socket.on('game_restarted', () => {
      setYourAnswers([]);
      setIsDone(false);
      navigate(`/waiting-room/related_words/${gameCode}`);

    });

  }, [socket]);

  useEffect(() => {
    const languageCode = isEnglish ? "en" : "es";
    localStorage.setItem('language', languageCode);
  }, [isEnglish]);

  const submitAnswer = (answer: string) => {
    if (!socket.isConnected()) {
      console.log("Socket not connected... trying to connect.");
      socket.connect();
    }

    setIsSubmitting(true);
    console.log(`Submitting answer: ${answer} to game code: ${gameCode}`);
    socket.emit('submit_answer', {
      game_code: gameCode,
      answer: answer,
    });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (answer.trim() !== '') {
      submitAnswer(answer);
      setAnswer('');
    }
  }

  useEffect(() => {
    socket.off('answer_response');
    socket.on('answer_response', (data: any) => {
      console.log(data);
      if (data.correct && !data.repeat) {
        setYourAnswers((currentAnswers) => [...currentAnswers, data.word]);
      }
      setIsSubmitting(false);
    });
  }, [socket]);

  if (isDone) {
    return (
      <Container sx={{ padding: '2.5%' }}>
        <Typography variant="h4" color={"black"} fontWeight={"bold"} sx={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px", width: "100%", textAlign: "center" }}>
          PLAYERS
        </Typography>

        <div
          style={{
            marginBottom: "10px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
            paddingLeft: "5px",
            paddingRight: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"black"} variant="h5">Rank</Typography>
          <Typography color={"black"} variant="h5">Name</Typography>
          <Typography color={"black"} variant="h5">Score</Typography>
        </div>

        {gameData.player_list.map((player: any, index: any) => (
          <div
            key={player.id}
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
              paddingLeft: "5px",
              paddingRight: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography color={"black"} variant="h5">{index + 1}</Typography>
            <Typography color={"black"} variant="h5">{player.name}</Typography>
            <Typography color={"black"} variant="h5">{player.score}</Typography>
          </div>
        ))}
      </Container>
    )
  }

  return (
    <RelatedWordsBackground theme={theme}>
      <Container maxWidth={false} sx={{
        height: 'clamp(600px, 50vh, 80vh)',
        display: 'flex',
        backgroundImage: '', // put image here?
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '2.5vh',
        alignItems: 'center'
      }}>
        <Container maxWidth={false} sx={{
          width: '95%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <CircularCountdown duration={60} />
          <TranslationButton isEnglish={isEnglish} setIsEnglish={setIsEnglish} />
        </Container>
        {yourAnswers.length > 0 && (
          <div>
            <Typography variant="h4" fontWeight={"bold"} sx={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px", width: "100%", textAlign: "center" }}>
              {isEnglish ? "Your answers" : "Tus respuestas"}
            </Typography>
            {yourAnswers.map((answer, index) => (
              <Chip key={index} label={answer} sx={{
                background: "white",
                fontWeight: "bold",
                color: "black",
                fontSize: "1.5em",
                padding: "5px",
              }} style={{ margin: "5px" }} />
            ))}
          </div>
        )}
        <Box sx={{
          background: 'white',
          padding: '2em',
          borderRadius: '16px',
        }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label={isEnglish ? "Enter a related word" : "Escribe una palabra relacionada"}
              variant="outlined"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              fullWidth
            />
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Submit
            </LoadingButton>
          </form>
        </Box>
      </Container>
    </RelatedWordsBackground>
  );
}

export default RelatedWordsGame;
