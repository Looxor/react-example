// Check typescript 3.7 ternary is working

const checkTSTernary = () => {
  let var1,
    var2 = 'Hello world';
  const obj1 = {
    var1: '123',
    var2: '456',
  };

  console.log(var1 ?? var2);
  console.log(obj1.var1 ?? 'obj1.var1');
  console.log(obj1['var3'] ?? 'obj1.var3');
  console.log(obj1['var3'] ?? obj1.var2);
};

class TestMap {}

const checkMap = () => {
  const array1 = [];
  console.log(array1.map(item => new TestMap()));
};

checkMap();
