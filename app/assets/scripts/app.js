var $ = require('jquery');
// var Person = require('./modules/Person');
import Person from './modules/Person';

class Adult extends Person {
    payTexes() {
        console.log(this.name + ' now owes £0 in taxes')
    }
}
var john = new Person("John Doe", "blue");
john.greet();

var jane = new Adult("Jane Smith", "orange");
jane.greet();
jane.payTexes();

$(".headline").first().remove();