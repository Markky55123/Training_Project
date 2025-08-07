import React, { useEffect, useState } from 'react'

export default function EmployeeCard(props) {
  let fontColor = ''
  if (props.sex === 'male') {
    fontColor = 'blue';
  } else {
    fontColor = 'pink';
  }

  const [userdata, setUserdata] = useState(null);

  const id = props.id;

  // async function fetchUserData() {
  //     try {
  //       const responsedata = await fetch('https://jsonplaceholder.typicode.com/todos/' + id);
  //       if (!responsedata.ok) {
  //         alert('Network response was not ok');
  //       }
  //       const data = await responsedata.json();
  //       setUserdata(data);
  //       console.log('Data fetched:', data);
  //     } catch (error) {
  //       console.error('Fetch error:', error);
  //     }
  //   }

  // Fetch user data when the component mounts
  
  useEffect(() => {
    async function fetchUserData() {
      try {
        const responsedata = await fetch('https://jsonplaceholder.typicode.com/todos/' + id);
        if (!responsedata.ok) {
          alert('Network response was not ok');
        }
        const data = await responsedata.json();
        setUserdata(data);
        console.log('Data fetched:', data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    fetchUserData();
  }, []);


  return (
    <div style={{ backgroundColor: props.cardColor, color: fontColor, padding: '10px',borderRadius: '10px', textAlign: 'center' }}>
      {props.name}
      {userdata && <div>Title: {userdata.title}</div>}

    </div>
  );
}