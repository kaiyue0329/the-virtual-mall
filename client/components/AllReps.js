import React from 'react';
import { Card, Image, Container } from 'semantic-ui-react';
import CreateChat from './CreateChat';

const AllReps = ({ createChat, chatUsername }) => {
  const reps = ['Representative 1', 'Representative 2', 'Representative 3'];

  return (
    <div className="panel">
      <Container textAlign="center" style={{ marginTop: '1rem' }}>
        <h3>Chat with one of our Customer Service Representatives:</h3>
        <Card.Group centered stackable>
          {reps.map(rep => (
            <Card
              className="centered"
              raised
              key={reps.indexOf(rep)}
              style={{ margin: '1rem' }}
            >
              <Image
                centered
                size="medium"
                src={`https://robohash.org/${rep}`}
              />
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
    </div>
  );
};

export default AllReps;
