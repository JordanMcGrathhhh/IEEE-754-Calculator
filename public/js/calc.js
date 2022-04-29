function calcBase2Integral(integral) {
    results = [];
    value = integral;
    for(let i = 0; i < integral; i++) {
      if( value == 0 ) { break; }
      results.push(value % 2);
      value = Math.floor(value / 2);
    }
    
    let pads = (8 - results.length); // Pads the results to allow for calculations later on
    for(let i = 0; i < pads; i++) { 
      results.push(0);
    }
    return results.reverse().join("");
  }
  
  function calcBase2Fraction(fraction) {
    if( isNaN(fraction) ) { return 0; }
    results = [];
    value = fraction * (0.1 ** fraction.toString().length); // Converts number to decimal for maths
    for(let i = 0; i < 23; i++) {
      results.push(Math.floor(value * 2));
      value *= 2;
      if ( value >= 1 ) { value -= 1; }
    }
    return results.join("");
  }
  
  function calcShiftBits(base2Integral) {
    holder = base2Integral.split("");
    shift = Math.abs(holder.indexOf("1") - 8) - 1; // This is where we have to move the decimal
    return shift;
  }
  
  function calcFracScientific(base2Integral, base2Fraction, shiftBits) {
    integral = base2Integral.split("").reverse().slice(0,shiftBits); // We reverse this to start from the beginning (2^1) then grab out the bits we need from shiftBits
    fraction = base2Fraction.toString().split("");
    
    for(let i = 0; i < shiftBits; i++) { fraction.pop(); }
    
    return (integral.join("") + fraction.join(""));
  }
  
  const container = document.querySelector('.math-container');
  const base10 = document.getElementById('base10-input');

  base10.addEventListener("input", (event) => {

    if (base10.value == '') { 
      container.style.display = 'none'; 
      return;
    }

    container.style.display = 'inline';

    let integral = base10.value.split(".")[0];
    let fraction = base10.value.split(".")[1];
    
    let base2Integral = calcBase2Integral(integral);
    document.getElementById('base2-integral').innerHTML = base2Integral;
    
    let base2Fraction = calcBase2Fraction(fraction);
    document.getElementById('base2-fraction').innerHTML = base2Fraction;
    
    let shiftBits = calcShiftBits(base2Integral);
    document.getElementById('shift-bits').innerHTML = shiftBits;
    
    let fracScientific = calcFracScientific(base2Integral, base2Fraction, shiftBits);
    document.getElementById('frac-scientific').innerHTML = fracScientific;
    
    // Set the Sign Bit Accordingly
    if(integral > 0) { document.getElementById('sign-bit').innerHTML = 0; }
    if(integral < 0) { document.getElementById('sign-bit').innerHTML = 1; }
    
    document.getElementById('exponent-bits').innerHTML = calcBase2Integral(127 + shiftBits);
    
    document.getElementById('fraction-bits').innerHTML = fracScientific;
    
  });