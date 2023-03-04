import { GetAboutYouData } from '../../apiclient/apiclient';
import { AboutYouData } from '../../models/AboutYouData';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { browserName, osName } from 'react-device-detect';
import NavBarComponent from '../../components/NavBarComponentBottom';

export default function AboutPage() {
  const [aboutYouData, setAboutYouData] = useState<AboutYouData>(
    {} as AboutYouData,
  );
  const [aboutYouShowing, setAboutYouShowing] = useState<boolean>(false);
  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    var hasRun = false;
    if (!hasRun) {
      GetAboutYouData(cancelToken).then((response) => {
        setAboutYouData(response);
      });
    }
    return () => {
      hasRun = true;
      cancelToken.cancel();
    };
  }, []);

  const getFunnyWelcomeLineForOS = () => {
    var base = 'I see you sitting there, on your ';
    switch (osName) {
      case 'Windows':
        return (
          base +
          'Windows PC. Its just you and me, helping Bill Gates add to those billions'
        );
      case 'Mac':
        return (
          base +
          'Apple Mac. Pondering why you spent so much on that slick, slick computer.'
        );
      case 'Android':
        return (
          base +
          'Android device. This is the calling to finally switch to Apple.'
        );
      case 'iOS':
        return (
          base +
          'Apple device. Wondering what new privacy settings will be added next. Maybe no texting? Who knows...'
        );
      case 'Linux':
        return (
          base +
          'cool kid Linux device. Probably hacking away in the background realizing you are top of the OS game.'
        );
      case 'Chrome OS':
        return (
          base +
          'probably Chrome book. The true question is, why? Any operating system is better than that.'
        );
      default:
        return (
          base +
          'device. Pondering if I actually know any of this information about you.'
        );
    }
  };

  const toggleAboutYouData = () => {
    if (
      (aboutYouData.city == null ||
        aboutYouData.regionName == null ||
        aboutYouData.country == null) &&
      !aboutYouShowing
    )
      return;
    setAboutYouShowing(!aboutYouShowing);
  };

  // Build UI
  return (
    <React.Fragment>
      <Container style={{ paddingTop: '2rem' }} id='aboutPage'>
        <div className='textContainer'>
          <div className='theShort'>
            <h3 className='subTitle'>Short Version</h3>
            <p className='contentText'>
              I am a developer based in Toronto, Canada. I'm from New Zealand
              but moved here to switch things up a little bit! I have a passion
              for all things programming, design and computers, I just can’t get
              enough of it. Ideally want to work in the security or artificial
              intelligence space at some point in my life! I lived overseas for
              a handful of years from 2009 in the amazing country of Oman.
            </p>
          </div>

          <div className='theLong'>
            <h3 className='subTitle'>Long Version</h3>
            <div className='personInformation'>
              <h4 className='subsubTitle'>The Person</h4>
              <p className='contentText'>
                I am a software developer from Wellington, New Zealand. Ever
                since I was young, I have had an interest in computers and how
                they work. I would play around with programs and computers at
                the tender age of about 9 where they first started becoming
                something of my future. A friend of mine first introduced me to
                programming in its entirety back in 2010 when I first moved
                overseas and form then on I have just been in love with the
                concepts!
              </p>

              <h4 className='subsubTitle'>Oman</h4>
              <p className='contentText'>
                Most people don’t know this but for 4 years of my life I did not
                live in New Zeeland. Instead I lived in one of the greatest
                countries I have ever lived in, that being, Oman (of the middle
                east). At first I was reluctant at moving to the middle east as
                I was not sure what to expect! It took me some time to come to
                love it. I learnt a lot through this 4/5 year experience and it
                made me the person I am today. It gave me experience to what the
                rest of the world is, as before moving overseas I think I was
                oblivious to it all (age probably played a good factor in that)!
                Eventually I moved back to New Zealand and went to boarding
                school through year 11-13 but those details are better for
                another time!
              </p>
            </div>

            <div className='technologyInformation'>
              <h4 className='subsubTitle'>The Technology</h4>
              <p className='contentText'>
                Ever since I was first introduced to programming and computers
                in their full back in 2010 I have been pretty much devoted to
                them. I have spent the last 10 years looking into new
                programming languages, new programming techniques and building
                computers. From then I built my first computer back when I
                started University back in 2017. I have also worked on
                technology projects in C#, Javascript, Java, C, Python, etc. To
                name a few.
              </p>
            </div>

            <div className='aboutYou'>
              <h3 className='subTitle'>About You</h3>
              <p
                className='contentText aboutYouShow specialLinkStyle'
                onClick={toggleAboutYouData}>
                Wait a second, what?
              </p>
              {aboutYouShowing && (
                <div className='aboutYouData'>
                  <p className='contentText'>{getFunnyWelcomeLineForOS()}</p>
                  <p className='contentText smallPad'>
                    You probably wonder how I know you are in{' '}
                    {aboutYouData.country}. But that would only be bad if I knew
                    you were also in the {aboutYouData.regionName} region.
                  </p>
                  <p className='contentText smallPad'>
                    You squint a little bit at your {browserName} browser,
                    wondering if I am indeed watching you.
                  </p>
                  <p className='contentText smallPad'>
                    But not to fear. I have no idea that you are in{' '}
                    {aboutYouData.city}, as that might be a little bit creepy,
                    no?
                  </p>
                  <p className='contentText smallPad'>
                    That's all I have today! Maybe for the best. Maybe I do
                    actually know more and just don't want to share.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      <NavBarComponent />
    </React.Fragment>
  );
}
