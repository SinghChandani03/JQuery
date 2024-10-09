$(document).ready(function () {

  'use strict';

  // Select all forms with the class 'needs-validation'
  var forms = $('.needs-validation');

  // Prevent form submission and add custom validation styles
forms.on('submit', function (event) {
      var form = $(this);
      var isValid = true;

      // Trigger input event on each input field
      form.find(':input').trigger('input');

      // Check if form is valid
      if (!form[0].checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          isValid = false;
      }

      form.addClass('was-validated');

      return isValid;
});

  $('#id').on('input', function () {
      var id = /^(?=.{5,30}$)\b\w+(?:\s+\w+)*\b$/;
      if (id.test($(this).val())) {
          $(this).removeClass('is-invalid').addClass('is-valid');
      } else {
          $(this).removeClass('is-valid').addClass('is-invalid');
      }
  });

  $('#project_title').on('input', function () {
      var title = /^(?=.{5,30}$)\b\w+(?:\s+\w+)*\b$/;
      if (title.test($(this).val())) {
          $(this).removeClass('is-invalid').addClass('is-valid');
      } else {
          $(this).removeClass('is-valid').addClass('is-invalid');
      }
  });

  $('#start_date').on('input', function () {
      var Sdate = /^\d{4}-\d{2}-\d{2}$/;
      if (Sdate.test($(this).val())) {
          $(this).removeClass('is-invalid').addClass('is-valid');
      } else {
          $(this).removeClass('is-valid').addClass('is-invalid');
      }
  });

  $('#due_date').on('input', function () {
      var Ddate = /^\d{4}-\d{2}-\d{2}$/;
      if (Ddate.test($(this).val())) {
          $(this).removeClass('is-invalid').addClass('is-valid');
      } else {
          $(this).removeClass('is-valid').addClass('is-invalid');
      }
  });

  $('#description').on('input', function () {
      var description = /^(?=.{50,100}$)\b\w+(?:\s+\w+)*\b$/;
      if (description.test($(this).val())) {
          $(this).removeClass('is-invalid').addClass('is-valid');
      } else {
          $(this).removeClass('is-valid').addClass('is-invalid');
      }
  });

  $('#status').on('change', function () {
      var selectedOption = $(this).val();
      if (selectedOption === '') {
          $(this).removeClass('is-valid').addClass('is-invalid');
      }
      else {
          $(this).removeClass('is-invalid').addClass('is-valid');
      }
  });

  if (!id || !title || !Sdate || !Ddate || descriptionValid.length < 50 || !selectedOption) {
      return false;
  }
  else {
      return true;
  }
});

$(document).ready(function () {

  function validateForm() {
      const id = $('#id').val();
      const product_title = $('#product_title').val();
      const start_date = $('#start_date').val();
      const duo_date = $('#duo_date').val();
      const status = $('#status').val();
      const description = $('#description').val();

      if (id == "" || product_title == "" || start_date == "" || duo_date == "" || status == "" || description == "") {
          alert("All Field Required !!");
          return false;
      }
      else {
          return true;
      }

  }

  // Initialize the user data array
  let userData = JSON.parse(localStorage.getItem('userData')) || [];

  // Function to populate the table with user data
  function displayUsers() {
      $('#crudTable tbody').empty();
      userData.forEach(function (user, index) {
          $('#crudTable tbody').append(`
            <tr>
                <td>${index + 1}</td>
                <td>${user.id}</td>
                <td>${user.project_title}</td>
                <td>${user.status}</td>
                <td>${user.start_date}</td>
                <td>${user.due_date}</td>
                <td>${user.description}</td>
                <td>
                    <button class="editUser btn btn-warning tbl-button" id="updateBtn" data-index="${index}">Update</button>
                    <button class="deleteUser btn btn-danger tbl-button" data-index="${index}">Delete</button>
                </td>
            </tr>
        `);
      });
  }
  displayUsers();

  // Handle form submission
  $('#form').submit(function (event) {
      if (!validateForm()) {
          event.preventDefault();
      }
      else {
          // Get form values
          const id = $('#id').val();
          const project_title = $('#project_title').val();
          const status = $('#status').val();
          const start_date = $('#start_date').val();
          const due_date = $('#due_date').val();
          const description = $('#description').val();

          userData.push({
              id: id,
              project_title: project_title,
              status: status,
              start_date: start_date,
              due_date: due_date,
              description: description,
          });


          // Save userData to local storage
          localStorage.setItem('userData', JSON.stringify(userData));

          // Repopulate the table
          displayUsers();
      }
  });
  $('#form')[0].reset();

  // Handle delete user button click
  $(document).on('click', '.deleteUser', function () {
      let index = $(this).data('index');
      if (confirm("Are you sure want to delete?")) {
          userData.splice(index, 1);
          localStorage.setItem('userData', JSON.stringify(userData));
          displayUsers();
      }
  });

  $(document).on('click', '.editUser', function () {
      const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : [];

      let index = $(this).data('index');
      let user = userData[index];

      $('#id').val(user.id);
      $('#project_title').val(user.project_title);
      $('#status').val(user.status);
      $('#start_date').val(user.start_date);
      $('#due_date').val(user.due_date);
      $('#description').val(user.description);
  });

  $('#submit').on('click', function () {
      let id = $('#id').val();
      let userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : [];
      let index = userData.findIndex(user => user.id === id);

      let updatedUser = {
          id: $('#id').val(),
          project_title: $('#project_title').val(),
          status: $('#status').val(),
          start_date: $('#start_date').val(),
          due_date: $('#due_date').val(),
          description: $('#description').val(),
      };

      if (index !== -1) {
          // If user already exists, update the existing entry in userData array
          userData[index] = updatedUser;
          // Update the row in the displayed table
          updateTableRow(index, updatedUser);
      }

      localStorage.setItem('userData', JSON.stringify(userData));
  });

  function updateTableRow(index, user) {
      // Assuming your table has an id attribute set to "userTable"
      let table = $('#userTable');
      let row = table.find('tr').eq(index + 1); // Add 1 to account for header row
      row.find('.id').text(user.id);
      row.find('.project_title').text(user.project_title);
      row.find('.status').text(user.status);
      row.find('.start_date').text(user.start_date);
      row.find('.due_date').text(user.due_date);
      row.find('.description').text(user.description);
  }


 

});
