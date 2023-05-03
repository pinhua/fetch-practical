window.addEventListener('DOMContentLoaded', function () {
     const form = document.querySelector('form');
     const message = document.querySelector('#message');

     form.addEventListener('submit', (event) => {
          event.preventDefault();
          const title = document.querySelector('#title').value;
          const body = document.querySelector('#body').value;
          let data = new FormData(document.getElementById('form'));
          var isSuccess = document.querySelector('#isSuccess');
          var responseStatus = document.querySelector('#responseStatus');
          var responseMessage = document.querySelector('#responseMessage');
          var errorMessage = document.querySelector('#fetchError');

          isSuccess.textContent = '----';
          responseStatus.textContent = '----';
          responseMessage.textContent = '----';
          errorMessage.textContent = `----`;

          fetch('http://localhost:3000/create.html/posts', {
               method: 'POST',
               body: data,
               headers:{
                    'Allow-Control-Allow-Origin':'*',
                    'Allow-Control-Allow-Headers': '*',
                    'Allow-Control-Allow-Methods':'*',
               }
          })
               .then(res => {
                    if (res.status === 201) {
                         isSuccess.textContent = 'TRUE'
                         responseStatus.textContent = res.status
                         responseMessage.textContent = res.id
                         errorMessage.textContent = ''
                    }
                    else if (res.status >= 400) {
                         isSuccess.textContent = 'FAILED'
                         responseStatus.textContent = res.status
                         responseMessage = res.message
                         errorMessage.textContent=''
                    }
               })
               .catch(error => {
                    isSuccess.textContent = 'ERROR'
                    responseStatus.textContent = ''
                    responseMessage.textContent = ''
                    errorMessage.textContent = error.message
               })

          // send a `POST /posts` HTTP request to create a new post
          /*
            if success (status === 201)
                 display "TRUE" in #isSuccess
                 display the status code in #responseStatus
                 display the new id from the response in #responseMessage
                 clear #error by setting an empty string to the text content
            else if is failed (status >= 400)
                 display "FAILED" in #isSuccess
                 display the status code in #responseStatus
                 display the error message from the response in #responseMessage
                 clear #error by setting an empty string to the text content
            else if fetch throws an error
                 display "ERROR" in #isSuccess
                 clear #responseStatus by setting an empty string to the text content
                 clear #responseMessage by setting an empty string to the text content
                 display the error message thrown by fetch in #error (i.e. error.message)
           */

          // You are to use Promise instead of async/await


     });
});
