export class DataModel {
}
  export class Employee {
    id = 0;
    name = '';
    surname = '';
    addresses: Address[];
  }
  
  export class Address {
    street = '';
    city   = '';
    provience  = '';
    code    = '';
  }
  
  export const employees: Employee[] = [
    {
      id: 1,
      name: 'Kevin',
      surname: 'Smith',
      addresses: [
        {street: '78 main Street Fourways',  city: 'Johnnesburg', provience: 'Gauteng',  code: '1628'},
        {street: '876 Bikeway', city: 'Durban', provience: 'Kwazulu Natal', code: '7529'},
      ]
    },
    {
      id: 2,
      name: 'Mark',
      surname: 'Jones',
      addresses: [
        {street: '75 Loop Street',  city: 'Cape Town', provience: 'Western Cape',  code: '1880'},
      ]
    },
    {
      id: 3,
      name: 'Simon',
      surname: 'Johnson',
      addresses: [
        {street: '89 Kings drives',  city: 'Pretoria', provience: 'Gauteng',  code: '7643'},
      ]
    },
    {
        id: 4,
        name: 'John',
        surname: 'Weston',
        addresses: [
          {street: '89 Wall Street Centurion',  city: 'Johnnesburg', provience: 'Gauteng',  code: '1678'},
        ]
      },
  ];



  
  

  export const proviences = ['Gauteng', 'Freestate', 'North West', 'Western Cape','Northen Cape','Eastern Cape','Limpopo','Mpumalanga','Kwazulu Natal'];