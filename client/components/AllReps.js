import React from 'react';
import { Card, Image, Container } from 'semantic-ui-react';
import CreateChat from './CreateChat';

const AllReps = ({ createChat, chatUsername }) => {
  const reps = [
    'Representative1',
    'Representative2',
    'Representative3',
    'Representative4',
    'Representative5',
    'Representative6'
  ];
  const cardColors = ['red', 'orange', 'brown', 'teal', 'blue', 'violet'];
  return (
    <Container textAlign="center">
      <h3>Chat with one of our Customer Service Representatives:</h3>
      <Card.Group
        centered
        stackable
        itemsPerRow={3}
        style={{ paddingLeft: '2rem' }}
      >
        {reps.map(rep => (
          <Card
            color={cardColors[reps.indexOf(rep)]}
            centered
            raised
            key={reps.indexOf(rep)}
            style={{ margin: '1rem' }}
          >
            <Image centered size="medium" src={`https://robohash.org/${rep}`} />
            <Card.Content>
              <Card.Header>{rep}</Card.Header>
              <CreateChat
                createChat={createChat}
                chatUsername={chatUsername}
                rep={rep}
              />
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default AllReps;
