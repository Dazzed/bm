
NEED FROM SAMEEP IN CHART VIEW

time the price was registered
{/* TODO: what does this mean, momentum, how does it map to my value, 'na' */}

      {/* TODO: BID LIST not getting this from server yet */}




// raw code from landscape mode
  // <View style={chart.bidAsksWrapper}>
  //   <View style={chart.bid}>
  //     <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTitle, fonts.hindGunturBd]}>BID</Text>
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>100</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.80</Text>
  //     </View>
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>10</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.00</Text>
  //     </View>
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>100</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.80</Text>
  //     </View>
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>10</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.00</Text>
  //     </View>
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>100</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.80</Text>
  //     </View>
  //   </View>
  //
  //   {/* TODO: ASK LIST not getting this from server yet */}
  //
  //   <View style={chart.bid}>
  //     <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTitle, fonts.hindGunturBd]}>ASK</Text>
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>100</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.80</Text>
  //     </View>
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>10</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.00</Text>
  //     </View>
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>100</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.80</Text>
  //     </View>dev
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>10</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.00</Text>
  //     </View>
  //     <View style={chart.bidaskRow}>
  //       <Text style={[{color: this.state.colors['lightGray']}, chart.bidaskNum, fonts.hindGunturRg]}>100</Text>
  //       <Text style={[{color: this.state.colors['darkGray']}, chart.bidaskPrice, fonts.hindGunturRg]}>$155.80</Text>
  //     </View>
  //   </View>
  // </View>
  //










  //////////////////////////////////////


Check for listeners -

  Auto login on Home

  component listen for change on Home

  component listen for change on LOGIN

  component listen for change on settings / logout

  make sure we are still dumping data into redux







  ////////////////////////
  FLOWS TO TEST

  Login with existing credentials first time
    should forward to accounts page

  Invalid login credentials
    should show error message

  Registration with new data
    Should forward to login view
    Login should work and forward to Funding view


  Close / Refresh app while logged in
    Should verify and forward to accounts page

  Logout button pressed
    Should logout
    Forward to home screen
