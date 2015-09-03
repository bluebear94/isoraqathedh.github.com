/* Unit generator
   Generates a coherent system of units similar to the SI.
   Is extensible by the user by modification of this JavaScript code.
   cc-by-sa-3.0 Isoraqathedh Zorethan Fuzokhalye */

var randoms = {
    // functions that generate functions that generate random numbers with given bounds.
    // This is some seriously high-level function creation,
    // so alter or add at your own risk.
    // The two provided should be enough for most purposes.
    // TODO: maybe add normal distribution
    // TODO: amount of substance has some extra stipulations you might add.
    uniform: function(from, to) {
        return function() {
            return (Math.random() * (to - from) + from);};},
    logarithmic: function(from, to, base) {
        return function() {
            return Math.pow(base, (randoms.uniform(from, to))());}}}

var fundamentals = {
    // The seven fundamental dimensions in the SI.
    // The generator can also take any other set of fundamental units
    // just by changing this object's properties.
    // The user is responsible for making sure the list of fundamentals
    // can describe everything in scope.
    // Each dimension requires three things:
    // 1. a name for the unit.
    // 2. a symbol for the unit.
    // 3. a generating function. This function will dictate how the values will be generated.
    // Remember that generatingFunction can accept any function that generates random numbers,
    // not just functions created by the randoms object.
    // that means if something is not to your satisfaction you can write your own.
    mass: {
        name: "kilogram",
        symbol: "kg",
        generatingFunction: randoms.logarithmic(-3, 1, 10)},
    length: {
        name: "metre",
        symbol: "m",
        generatingFunction: randoms.logarithmic(-3, 1, 10)},
    time: {
        name: "second",
        symbol: "s",
        generatingFunction: randoms.logarithmic(-3, 2.1, 10)},
    amountOfSubstance: {
        name: "mole",
        symbol: "mol",
        generatingFunction: randoms.logarithmic(20, 25, 10)},
    luminousIntensity: {
        name: "candela",
        symbol: "cd",
        generatingFunction: randoms.logarithmic(-1, 3, 10)},
    temperature: {
        name: "kelvin",
        symbol: "K",
        generatingFunction: randoms.uniform(0.5, 3)},
    current: {
        name: "ampere",
        symbol: "A",
        generatingFunction: randoms.uniform(15, 20)}};

var derived = {
    // A list of derived units.
    // Derived units are described by a list of other units with an exponent.
    // Each key:value pair represents a dimension
    // and the exponent that the dimension is to be raised to.
    // The complete dimension of the quantity
    // is then calculated by multiplying each dimension key-value pair.
    // Dimensions can be appended or removed from this list
    // simply by editing this object's properties;
    // they are calculated automatically each time the entire procedure runs.
    // Dimension key-value pairs can be any fundamental unit
    // or any other derived unit as long as it is defined somewhere.
    // In the interests of maintenance
    // it is suggested that you do not place a derived unit in the definition of another unit
    // before where the derived unit is actually defined,
    // but you are allowed to do that.
    area: {length: 2},
    volume: {length: 3},
    speed: {length: 1, time: -1},
    acceleration: {speed: 1, time: -1},
    force: {mass: 1, acceleration: 1},
    pressure: {force: 1, area: -1},
    energy: {force: 1, length: 1},
    power: {energy: 1, time: -1},
    charge: {current: 1, time: 1}};

/* Modification beyond this point not recommended */

function Fundamentals(params) {
    // constructor function for various objects,
    // including dimensions and systems.
    for (dimension in fundamentals) {
        this[dimension] = (params[dimension] === undefined) ? 0 : params[dimension];}}

function convertToBaseUnits(quantity, opt_dimensionsSoFar) {
    // Function to convert derived units to a combination of the seven basic units.
    // Takes a quantity (as a string), then converts it to a Fundamentals object.
    // The value to each key is the exponent to which the key is to be raised to
    // so that the combination, when multiplied appropriately, yields the quantity in the parameter.
    // Throws an error if it cannot find the quantity in either the derived or fundamental lists.
    // opt_dimensionsSoFar is an optional value that should not be used by the user;
    // it is used for recursion.
    // ---
    // handle default value
    /// console.log(opt_dimensionsSoFar);
    dimensionsSoFar = (opt_dimensionsSoFar === undefined) ? new Fundamentals({}) : opt_dimensionsSoFar
    /// console.log("Enter with ", dimensionsSoFar);
    // now the rest
    if (Object.keys(derived).indexOf(quantity) !== -1) {
        // only deal with stuff that we know about
        for (dimension in derived[quantity]) {
            // Recursively search for quantities.
            // For each item,
            // add its dimensions to the accumulator named dimensionsSoFar.
            // if its dimensions are not fundamental, descend.
            /// console.log("Adding", dimension);
            if (Object.keys(fundamentals).indexOf(dimension) !== -1) { // base case
                dimensionsSoFar[dimension] += derived[quantity][dimension]}
            else { // Recursive case
                dimensionsSoFar = convertToBaseUnits(dimension, dimensionsSoFar);}}
            /// console.log("After adding ", dimensionsSoFar);}
        return dimensionsSoFar;}
    else {
        throw "Dimension not found in the dimension lists";}}

function generateSystem(opt_heldValues) {
    // creates a system of fundamental values.
    // opt_heldValues (defaulting to {}, i.e. no values held) are passed through.
    // The rest are generated according to the generateFunctions
    // in the fundamentals object.
    var system = (opt_heldValues === undefined) ? {} : opt_heldValues;
    for (dimension in fundamentals) {
        if (system[dimension] === undefined) {
            system[dimension] = fundamentals[dimension].generatingFunction();}}
    return new Fundamentals(system);}

// function conversionFactor(quantity, generatedSystem) {
//     // converts 1 generated unit of the quantity into SI units
//     // (or other fundamental units defined by fundamentals).
//     for (i in convertToBaseUnits(quantity) {
        
