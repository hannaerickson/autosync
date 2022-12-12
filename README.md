# CarCar

Team:

* Hanna Erickson - service microservice
* Ryan Holzer - sales microservice

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

In building the sales microservice for project beta, I started with the models. I first created the sales person and customer models as they were the most straightforward. For the sale model, used both the customer and the sales person as foreign keys, deciding to protect the sale upon deletion of a customer or sales person. My thinking here was, in a real world application, you would most likely want to keep track of your sale whether or not your customer or sales person stuck around.  Finally, created an automobile value object, with only a vin number attribute, as it was all I would need to track sales. This led to creating poller (and a superuser to easily check that said poller was working, which involved registering my models in the admin.py file) to make an internal api call to the inventory micro service, pulling all automobiles as they were created, and making value objects with the vin number of each instance of an automobile object.

Next, I would focus on my API calls. I, using full CRUD, created list and detail views for each model, allowing me to view all instances of a given model class, create an instance, or show the details of/edit/delete an instance of a model class using the id for reference in its path. Each view was registered in a newly created urls.py file in my sales_rest folder. After each view was created and each path was registered, my models were all given their own encoders for list/detail API calls, which were placed in their own, encoders.py file.

Then, it was time for the front end. In spite being new to React, my diligent partner and I opted to work with classless components, using hooks. I first created all forms, making “POST” API calls within arrow function event handlers to create new instances of models in my database. Once the more basic forms were functional, I moved onto the sales records. For the component that creates a sale, I had to make API calls in order to retrieve all instances of vehicles in inventory, all sales persons, and all customers in my database to create dropdowns for each respective category. These calls were placed inside of a single useEffect to fetch the data upon initial render of the component, using an empty list as its dependency.  I then added a price, sent a “POST” API call to create the sale, and another to remove the vehicle from inventory. To then list the sales, I needed to use a filter function in order to show all sales, but also show sales organized by each individual sales person.

Finally, my partner and I collaborated on the inventory microservice. I created the forms, and she created the list pages, following the aforementioned formula. Then, while she began working on some style upgrades, I focused on making each form component a child of the list component. In order make the list re-render upon creation of a new model, make, or specific automobile, I passed the initial list and setList as props to the child component. This allowed me to change the state of the parent component within my onSubmit function in the child component. All in all, a relatively fun, learning experience for both my partner and I, who collaborated closely each step of the way, to ensure our language was ubiquitous, and our code looked similar enough to belong in the same application. A true team effort.
