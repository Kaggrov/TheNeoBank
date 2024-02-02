import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const googleTranslateElementInit = () => {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      autoDisplay: false,
    },
    'google_translate_element'
  );
};

function Languages() {
  useEffect(() => {
    // Load the Google Translate API script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Assign the callback function to the window
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Cleanup function to remove the script element on unmount
    
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          
          <div id="google_translate_element"></div>
          <h4>Start building your app. Happy Coding!</h4>
        </Col>
      </Row>
    </Container>
  );
}





export default Languages
