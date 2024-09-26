import React from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useWindowSize from '../../../../hooks/useWindowSize';
import NavSearch from './NavSearch';

const NavLeft = () => {
  const windowSize = useWindowSize();

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          <Dropdown align={'start'}>
            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
              Tareas
            </Dropdown.Toggle>
            <ul>
              <Dropdown.Menu>
                <li>
                  <Link to="/tarea/add" className="dropdown-item">
                    Nueva tarea
                  </Link>
                </li>
                <li>
                  <Link to="/tarea/listado" className="dropdown-item">
                    Listar tareas
                  </Link>
                </li>
              </Dropdown.Menu>
            </ul>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;
