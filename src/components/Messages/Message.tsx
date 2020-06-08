import React, {
  FC,
  useEffect,
  useState,
  useRef,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Socket } from 'hooks/useSocket';
import useStore from 'hooks/useStore';

interface IProps {
  socket?: Socket;
}

interface IMessage {
  username: string;
  text: string;
  time: string;
}

const Message: FC<IProps> = ({ socket }) => {
  const { authStore } = useStore();
  const [userOnline, setUserOnline] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessage] = useState<IMessage[]>([]);
  const { username } = useParams<{ username: string }>();
  const contentRef = useRef(null);

  const classes = useStyles(userOnline)();

  useEffect(() => {
    if (socket !== undefined) {
      socket.io?.emit('enter chat', {
        username: authStore.user?.userName,
        room: username,
      });

      socket.io!.on('user joined', (newUser: string) => {
        if (newUser !== authStore.user?.userName) {
          setUserOnline(true);
        }
      });

      socket.io?.on('new message', (data: IMessage) => {
        setMessage((state) => [...state, data]);
      });
    }
  }, [socket, username]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setChatInput(e.target.value);
  };

  const handleEnter = () => {
    if (socket !== undefined) {
      socket.io?.emit('new message', chatInput);
      setChatInput('');

      if (Boolean(contentRef) && Boolean(contentRef.current)) {
        (contentRef.current as any).scrollTop = (contentRef.current as any).scrollHeight;
      }
    }
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleEnter();
    }
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography className={classes.title}>
        {username} <span className={classes.indicator} />
      </Typography>
      <div className={classes.content} ref={contentRef}>
        {messages.map((message, idx) => (
          <div key={idx} className="wrapper">
            <div className="header">
              <span className="username">{message.username}</span>
              <span className="time">{message.time}</span>
            </div>
            <p className="text">{message.text}</p>
          </div>
        ))}
      </div>
      <TextField
        variant="outlined"
        fullWidth={true}
        focused={true}
        value={chatInput}
        label="Click Enter"
        placeholder="Text here..."
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </Container>
  );
};

const useStyles = (online: boolean) =>
  makeStyles((theme) => ({
    container: {
      paddingTop: 75,
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      color: theme.palette.common.white,
      background: theme.palette.primary.light,
      padding: '25px 50px',
    },
    indicator: {
      width: 7,
      height: 7,
      marginLeft: 15,
      borderRadius: '50%',
      backgroundColor: online
        ? theme.palette.primary.light
        : theme.palette.secondary.light,
    },
    content: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      height: 'calc(100vh - 275px)',
      width: '100%',
      borderLeft: `1px solid ${theme.palette.secondary.main}`,
      padding: 25,
      margin: '25px 0',
      overflowY: 'scroll',

      '& .wrapper': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        color: theme.palette.common.white,
        background: theme.palette.secondary.light,
        borderRadius: 5,
        padding: '15px 20px 10px',
        marginBottom: 25,

        '&:last-child': {
          marginBottom: 0,
        },
      },
      '& .header': {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        borderBottom: `1px solid ${theme.palette.common.white}`,
        paddingBottom: 10,
      },
      '& .username': {
        fontSize: 18,
      },
      '& .time': {
        fontSize: 15,
      },
      '& .text': {
        fontSize: 16,
      },
    },
  }));

export default Message;
