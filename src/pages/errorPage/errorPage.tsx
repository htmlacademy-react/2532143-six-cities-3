import { Fragment } from 'react';


function ErrorPage(): JSX.Element {
  return (
    <Fragment>
      <h1 style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
      }}
      >
        ERROR 404: Page Not Found
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <img
          src='https://img.freepik.com/premium-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?w=1480'
          width='500'
          height='400'
        />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blue'
      }}
      >
        <h2>
          <a href="/">Click here to go Main Page</a>
        </h2>
      </div>
    </Fragment>
  );
}

export default ErrorPage;
