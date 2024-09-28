import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SampleCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://placehold.co/180x100" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
        INSERT GENRE/ARTIST/ALBUM HERE <br />
        I'm thinking we could use cards to display the api results
        along with serving the genres.
        </Card.Text>
        <Button variant="primary">Do a Thing</Button>
        <Button variant="primary">Save a Thing</Button>
      </Card.Body>
    </Card>
  );
}

export default SampleCard;