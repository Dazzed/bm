
done
- Error with withdraw limit
-When there is no input within the DOB, SSN, etc. boxes we made a change to make the numbers grey, they are now
black again




-In the on boarding flow, the #’ selection is now incorrect
NOT CLEAR ENOUGH TO UNDERSTAND



Deposit and Withdrawal buttons in settings still don’t work





-At the end of the flow I am unable to select the I agree button, thus not allowing me to complete the on boarding





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
