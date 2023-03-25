import { setActiveLink } from '@src/context/slices/auth_slice';
import { store } from '@src/context/store';
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
// Constants settings
/*Play with these constants*/
const columns = 2;
const rows = 2;
const factor = 0.6;
const containerWidth = columns < rows ? (columns / rows) * 100 : 100;
const containerHeight = rows < columns ? (rows / columns) * 100 : 100;
const bigSide = factor * Math.min(containerWidth, containerHeight);
// Array of the divs we are working with
let items: any = [];

export default function HomePage() {
  const [hovered, setHovered] = useState({
    title: true,
    projects: false,
    about: false,
    connect: false,
  });
  const is1100px = useMediaQuery({ query: '(max-width: 1100px)' });
  const [isReady, setIsReady] = useState<boolean>(false);

  const mouseClickApplyActive = (id: string) => {
    store.dispatch(setActiveLink(id));
  };

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    const container = document.getElementById('homePage');
    if (container != null) {
      container.style.width = containerWidth + 'vw';
      container.style.height = containerHeight + 'vh';
      container.style.gridTemplateColumns = 'repeat(' + columns + ', 1fr)';
      container.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';
    }
    // Set items variable for later use
    items = container?.children ?? [];
  }, [is1100px, isReady]);

  const setAttribute = (width: any, height: any, colour: any) => {
    return (
      'width:' +
      width +
      'vw; height: ' +
      height +
      'vh; background-color:' +
      colour +
      '; display: flex'
    );
  };

  const mouseEnterResize = (id: string, leaveSize: boolean = false) => {
    let itemWidth;
    let itemHeight;
    let itemAttribute;
    let target = parseInt(id.split('-')[1]);

    setHovered({
      title: target == 1,
      projects: target == 2,
      about: target == 3,
      connect: target == 4,
    });

    if (!leaveSize) {
      for (let i = 0; i < items.length; i++) {
        let colour = 'transparent';
        let itemNr = parseInt(items[i].id.split('-')[1]);
        items[i].classList.remove('overridePrimaryColour');
        if (itemNr == target) {
          //This is the hovered item
          itemWidth = bigSide;
          itemHeight = bigSide;
          colour = '#55cc69';
        } else if (
          Math.ceil(itemNr / columns) === Math.ceil(target / columns)
        ) {
          //This item is on the same row as the hovered item
          itemWidth = (containerWidth - bigSide) / (columns - 1);
          itemHeight = bigSide;
        } else if ((itemNr - target) % columns === 0) {
          //This item is in the same column as the hovered item
          itemWidth = bigSide;
          itemHeight = (containerHeight - bigSide) / (rows - 1);
        } else {
          itemWidth = (containerWidth - bigSide) / (columns - 1);
          itemHeight = (containerHeight - bigSide) / (rows - 1);
        }
        itemAttribute = setAttribute(
          itemWidth,
          itemHeight,
          colour ?? 'transparent',
        );
        items[i].setAttribute('style', itemAttribute);
      }
    }
  };

  const mouseLeaveReset = (leaveSize: boolean = false) => {
    setHovered({ title: true, projects: false, about: false, connect: false });
    if (!leaveSize) {
      for (let i = 0; i < items.length; i++) {
        let itemAttribute;
        if (i == 0) {
          itemAttribute = setAttribute(70, 70, '#55cc69');
        } else if (i == 1) {
          itemAttribute = setAttribute(30, 70, 'transparent');
        } else if (i == 2) {
          itemAttribute = setAttribute(70, 30, 'transparent');
        } else if (i == 3) {
          itemAttribute = setAttribute(30, 30, 'transparent');
        }

        if (itemAttribute != null) {
          items[i].setAttribute('style', itemAttribute);
        }
      }
    }
  };

  // Build mobile friendly UI
  const mobileFriendlyUI = () => {
    return (
      <React.Fragment>
        <div
          id='mobileHome'
          style={{
            display: 'grid',
            gridTemplateRows: '4fr 1fr 1fr 1fr',
            gridTemplateColumns: '1fr',
            height: '100vh',
            width: '100vw',
          }}>
          <Nav.Link
            onClick={() => mouseClickApplyActive('home')}
            onMouseEnter={() => mouseEnterResize('item-1', true)}
            onMouseLeave={() => mouseLeaveReset(true)}
            id='item-1'
            as={Link}
            to='/Home'
            className='linkStyle specialLinkStyle linkItem'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid white',
              backgroundColor: '#55cc69',
              height: 'auto',
              width: 'auto',
            }}>
            <div style={{ margin: 'auto' }}>
              <div className='meContainer'>
                <div
                  className='mePhoto'
                  style={{ height: '10rem', width: '10rem' }}>
                  <img
                    src='https://storage.googleapis.com/public_images_us/hopefully-square.jpg'
                    className='mePhoto'
                    style={{ height: '10rem', width: '10rem' }}
                    alt='Close up of my face in 2019'
                  />
                </div>
              </div>
              <div className='hello'>
                <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Hello People
                </h2>
              </div>
              <div style={{ display: 'flex' }}>
                <p className='typedStyles overridePrimaryColour'>
                  I'm Corbyn Greenwood! ^^ That's me!
                </p>
              </div>
              <div className='smallBlurb'>
                <span className='blurb-p'>Software Engineer</span>&nbsp;|&nbsp;
                <span
                  className={`blurb-p overridePrimaryColour`}
                  id='colourBlurb'>
                  Developer
                </span>
                &nbsp;|&nbsp;
                <span className='blurb-p'>Designer</span>
              </div>
            </div>
          </Nav.Link>
          <Nav.Link
            onClick={() => mouseClickApplyActive('projects')}
            onMouseEnter={() => mouseEnterResize('item-2', true)}
            onMouseLeave={() => mouseLeaveReset(true)}
            id='item-2'
            as={Link}
            to='/Projects'
            className='linkStyle specialLinkStyle linkItem'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid white',
              borderTop: '1px solid white',
              height: 'auto',
              width: 'auto',
            }}>
            <div style={{ margin: 'auto' }}>
              <p
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'inherit',
                }}
                className={`${
                  hovered.projects ? 'overridePrimaryColourWhite' : ''
                }`}>
                PROJECTS
              </p>
            </div>
          </Nav.Link>
          <Nav.Link
            onClick={() => mouseClickApplyActive('about')}
            onMouseEnter={() => mouseEnterResize('item-3', true)}
            onMouseLeave={() => mouseLeaveReset(true)}
            id='item-3'
            as={Link}
            to='/About'
            className='linkStyle specialLinkStyle linkItem'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottom: '1px solid white',
              borderTop: '1px solid white',
              height: 'auto',
              width: 'auto',
            }}>
            <div style={{ margin: 'auto' }}>
              <p
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'inherit',
                }}
                className={`${
                  hovered.about ? 'overridePrimaryColourWhite' : ''
                }`}>
                ABOUT
              </p>
            </div>
          </Nav.Link>
          <Nav.Link
            onClick={() => mouseClickApplyActive('connect')}
            onMouseEnter={() => mouseEnterResize('item-4', true)}
            onMouseLeave={() => mouseLeaveReset(true)}
            id='item-4'
            as={Link}
            to='/Contact'
            className='linkStyle specialLinkStyle linkItem'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderTop: '1px solid white',
              height: 'auto',
              width: 'auto',
            }}>
            <div style={{ margin: 'auto' }}>
              <p
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'inherit',
                }}
                className={`colouredWhiteOnHoverOnHover ${
                  hovered.connect ? 'overridePrimaryColourWhite' : ''
                }`}>
                CONNECT
              </p>
            </div>
          </Nav.Link>
        </div>
      </React.Fragment>
    );
  };

  const nonMobileFriendlyUI = () => {
    // Build UI
    return (
      <React.Fragment>
        <div
          id='homePage'
          className={`homePageNavContainer`}
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage:
              'url("https://storage.googleapis.com/public_images_us/test-background.svg")',
          }}>
          <Nav.Link
            onClick={() => mouseClickApplyActive('home')}
            onMouseEnter={() => mouseEnterResize('item-1')}
            onMouseLeave={() => mouseLeaveReset()}
            id='item-1'
            as={Link}
            to='/Home'
            className='linkStyle specialLinkStyle title linkItem'
            style={{ backgroundColor: '#55cc69' }}>
            <div style={{ margin: 'auto' }}>
              <div className='meContainer'>
                <div
                  className='mePhoto'
                  style={
                    hovered.title
                      ? { height: '16rem', width: '16rem' }
                      : { height: '10rem', width: '10rem' }
                  }>
                  <img
                    src='https://storage.googleapis.com/public_images_us/hopefully-square.jpg'
                    className='mePhoto'
                    style={
                      hovered.title
                        ? { height: '16rem', width: '16rem' }
                        : { height: '10rem', width: '10rem' }
                    }
                    alt='Close up of my face in 2019'></img>
                </div>
              </div>
              <div className='hello'>
                <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Hello People
                </h2>
              </div>
              <div style={{ display: 'flex' }}>
                <p
                  className={`typedStyles ${
                    hovered.title ? 'overridePrimaryColour' : ''
                  }`}>
                  I'm Corbyn Greenwood! ^^ That's me!
                </p>
              </div>
              <div className='smallBlurb'>
                <span className='blurb-p'>Software Engineer</span>&nbsp;|&nbsp;
                <span
                  className={`blurb-p ${
                    hovered.title ? 'overridePrimaryColour' : ''
                  }`}
                  id='colourBlurb'>
                  Developer
                </span>
                &nbsp;|&nbsp;
                <span className='blurb-p'>Designer</span>
              </div>
            </div>
          </Nav.Link>
          <Nav.Link
            onClick={() => mouseClickApplyActive('projects')}
            onMouseEnter={() => mouseEnterResize('item-2')}
            onMouseLeave={() => mouseLeaveReset()}
            id='item-2'
            as={Link}
            to='/Projects'
            className='linkStyle specialLinkStyle projects linkItem'>
            <div style={{ margin: 'auto' }}>
              <p
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#55cc69',
                  transition: 'all 0.6s ease',
                }}
                className={
                  hovered.projects ? 'overridePrimaryColourWhite' : ''
                }>
                PROJECTS
              </p>
            </div>
          </Nav.Link>
          <Nav.Link
            onClick={() => mouseClickApplyActive('about')}
            onMouseEnter={() => mouseEnterResize('item-3')}
            onMouseLeave={() => mouseLeaveReset()}
            id='item-3'
            as={Link}
            to='/About'
            className='linkStyle specialLinkStyle about linkItem'>
            <div style={{ margin: 'auto' }}>
              <p
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#55cc69',
                  transition: 'all 0.6s ease',
                }}
                className={hovered.about ? 'overridePrimaryColourWhite' : ''}>
                ABOUT
              </p>
            </div>
          </Nav.Link>
          <Nav.Link
            onClick={() => mouseClickApplyActive('connect')}
            onMouseEnter={() => mouseEnterResize('item-4')}
            onMouseLeave={() => mouseLeaveReset()}
            id='item-4'
            as={Link}
            to='/Contact'
            className='linkStyle specialLinkStyle connect linkItem'>
            <div style={{ margin: 'auto' }}>
              <p
                style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#55cc69',
                  transition: 'all 0.6s ease',
                }}
                className={hovered.connect ? 'overridePrimaryColourWhite' : ''}>
                CONNECT
              </p>
            </div>
          </Nav.Link>
        </div>
      </React.Fragment>
    );
  };

  if (is1100px) return mobileFriendlyUI();
  else return nonMobileFriendlyUI();
}
