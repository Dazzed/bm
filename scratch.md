
done
- Error with withdraw limit
-When there is no input within the DOB, SSN, etc. boxes we made a change to make the numbers grey, they are now
black again

-At the end of the flow I am unable to select the I agree button, thus not allowing me to complete the on boarding
This works fine for me

-In the on boarding flow, the #’ selection is now incorrect
designs have been revised but they are janky

Deposit and Withdrawal buttons in settings still don’t work
- Works great for me. I have screenshots to prove it. Please send your exact device model.




getNumFieldClass() {
  const { theme } = colorStore;
  const { registrationDataJS } = registrationStore;
  console.log('get num field class', registrationDataJS.phoneField, registrationDataJS.phoneField.length)
  if(registrationDataJS.phoneField.length === 0) {
    return {
      ...styles_2.registrationFormFieldInActive,
      color: theme.lightGray
    }
  } else {
    return {
      ...styles_2.registrationFormFieldActive,

    }
  }
}
