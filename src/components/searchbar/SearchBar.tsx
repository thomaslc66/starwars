import React, { useContext } from 'react';
import { Input, Col, Row, notification } from 'antd';
import { galaxyContext } from '../../context/galaxyContext';
import { searchPlanet, getNextPage } from '../../utils/Axios';
import './Style.css';

export function SearchBar(props: any) {
  const {
    setPlanets,
    setCount,
    toggleSearch,
    setSearchValue,
    searchValue,
  } = useContext(galaxyContext);

  const handleSubmit = (event: any) => {
    if (event) {
      event.preventDefault();
    }

    if (searchValue) {
      toggleSearch();
      searchPlanet(searchValue).then((response) => {
        if (response.status === 200) {
          const {
            data: { count, results },
          } = response;
          setCount(count);
          setPlanets(results);
        }
      });
    } else {
      notification.error({
        message: 'Error',
        description: 'Planet name is empty',
      });
    }
  };

  function resetSearch() {
    toggleSearch();
    setSearchValue('');
    getNextPage().then((response) => {
      if (response.status === 200) {
        const {
          data: { count, results },
        } = response;
        setCount(count);
        setPlanets(results);
      } else {
        notification.error({
          message: 'Erreur lors de la récupération de la galaxie',
          description: 'Le côté obscur doit y être pour quelque chose !',
        });
      }
    });
  }

  function handleInputchange(event: any) {
    event.persist();
    setSearchValue(event.target.value);
  }

  return (
    <Row>
      <Col span={10} offset={7}>
        <form onSubmit={handleSubmit}>
          <Input
            data-testid='search-input'
            placeholder='Search for a planet'
            value={searchValue}
            onChange={handleInputchange}
          ></Input>
          <div className='search-btn'>
            <button type='submit' className='btn orange'>
              Search
            </button>
            <span className='spacer' />
            <button type='button' className='btn blue' onClick={resetSearch}>
              Reset
            </button>
          </div>
        </form>
      </Col>
    </Row>
  );
}
