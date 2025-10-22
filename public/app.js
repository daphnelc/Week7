console.log('Client is working');

//load the page
window.addEventListener("load", function () {

  const feed = document.getElementById('feed');

  //fetching the data from the route
  fetch('/breakfast')
    .then(response => response.json())
    .then(data => {
      console.log(data);

      //Add breakfasts to the page
      const breakfasts = data.data;
      console.log(breakfasts);

      for (let i = 0; i < breakfasts.length; i++) {
        const breakfast = breakfasts[i].breakfast;
        const date = breakfasts[i].date;
        console.log(breakfast, date);

        const newBreakfast = document.createElement('div');
        newBreakfast.classList.add('breakfast-item');
        
        newBreakfast.innerHTML = `
          <p class="date">${date}</p>
          <p class="breakfast">${breakfast}</p>
        `;
        
        feed.appendChild(newBreakfast);
      }
    })
    .catch(error => {
      console.error(error);
    });

  /* -------------------------------------------------------------------------- */
  /*                            Add new breakfast item                          */
  /* -------------------------------------------------------------------------- */

  const dateInput = document.querySelector("#date-input");
  const breakfastInput = document.querySelector("#breakfast-input");
  const button = document.querySelector('#breakfast-submit');

  button.addEventListener('click', () => {
    console.log('clicked');

    const dateValue = dateInput.value;
    const breakfastValue = breakfastInput.value;
    console.log(dateValue, breakfastValue);

    const breakfastObject = {
      date: dateValue,
      breakfast: breakfastValue
    };
    console.log(breakfastObject);

    const breakfastObjectJSON = JSON.stringify(breakfastObject);
    console.log(breakfastObjectJSON);

    fetch('/new-breakfast', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: breakfastObjectJSON
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const newBreakfast = document.createElement('div');
        newBreakfast.classList.add('breakfast-item');
        
        newBreakfast.innerHTML = `
          <p class="date">${data.date}</p>
          <p class="breakfast">${data.breakfast}</p>
        `;
        
        feed.appendChild(newBreakfast);

        // clear inputs
        dateInput.value = '';
        breakfastInput.value = '';
      })
      .catch(error => {
        console.error(error);
      });
  });
});

