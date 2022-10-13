function foo() {
  // this.variable = "potential accidental global";
  console.log(this)
}
foo();