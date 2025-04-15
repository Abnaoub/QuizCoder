var schoolSubjectsElement = document.getElementById('school-subjects')

fetch('./data/school_subjects.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    for(let schoolSubject of data.school_subjects){
        //Create Anchor Tag as a school subject container
        let a = document.createElement('a')
        a.className = 'school-subject-container';
        a.href = schoolSubject.slug;
        // Add School Subject Title
        let titleElement = document.createElement('h2');
        titleElement.textContent = schoolSubject.name
        a.appendChild(titleElement)
        // Add School Subject Image
        let image = document.createElement('img');
        image.src = `images/${schoolSubject.image}`;
        image.alt = schoolSubject.title;
        image.width = 300;
        image.height = 300;
        a.appendChild(image);
        // Add School Subject Description
        let descriptionElement = document.createElement('p');
        descriptionElement.textContent = schoolSubject.description;
        a.appendChild(descriptionElement);
        schoolSubjectsElement.appendChild(a)
    }

  })
  .catch(err => console.error(err));
