<!-- 
     //* botonicon.vue
     //* muestra el icono y la descripcón de los iconos de fontawesome
     //* Marzo, 2019
     //* by Juan Carlos Jocop
-->
<template>
     <section>
          <div class="col s2">
               <button class="btn waves-effect btn-medium blue lighten-1 z-depth-4" 
                         style="font-size:22px;color:indigo">
                         <fontawesomeicon :icon="icono" />
                         <b style="font-size:12.5px;color:black">{{descripcion}}</b> 
               </button>
          </div>
     </section>
</template>

<script>

     import {library}                                from '@fortawesome/fontawesome-svg-core'
     import {  faAd, faAddressBook, faAddressCard, faAdjust, faAirFreshener, faAlignCenter, 
               faAlignJustify, faAlignLeft, faAlignRight, faAllergies,faAmbulance, faAmericanSignLanguageInterpreting,
               faAnchor, faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp, faAngleDown, 
               faAngleLeft, faAngleRight, faAngleUp, faAngry, faAnkh, faAppleAlt, 
               
               faArchive, faArchway, faArrowAltCircleDown, faArrowAltCircleLeft, faArrowAltCircleRight, faArrowAltCircleUp,
               faArrowCircleDown, faArrowCircleLeft, faArrowCircleRight, faArrowCircleUp, faArrowDown, faArrowLeft,      
               faArrowRight, faArrowsAlt, faArrowsAltH, faArrowsAltV, faArrowUp, faAssistiveListeningSystems, 
               faAsterisk, faAt, faAtlas, faAtom, faAudioDescription, faAward, 

               faBaby, faBabyCarriage, faBackspace, faBackward, faBacon, 
               faBalanceScale, faBan, faBandAid, faBarcode, faBars, faBaseballBall, 
               faBasketballBall, faBath, faBatteryEmpty, faBatteryFull, faBatteryHalf, faBatteryQuarter, 
               faBatteryThreeQuarters, faBed, faBeer, faBell, faBellSlash, faBezierCurve, 
               
               faBible, faBicycle, faBinoculars, faBiohazard, faBirthdayCake, faBlender, 
               faBlenderPhone, faBlind, faBlog, faBold, faBolt, faBomb, faBone, 
               faBong, faBook, faBookDead, faBookmark, faBookMedical, faBookOpen,               
               faBookReader, faBowlingBall, faBox, faBoxes, faBoxOpen, faBraille, 

               faBrain, faBreadSlice, faBriefcase, faBriefcaseMedical, faBroadcastTower, faBroom, 
               faBrush, faBug, faBuilding, faBullhorn, faBullseye, faBurn, 
               faBus, faBusAlt, faBusinessTime, faCalculator, faCalendar, faCalendarAlt, 
               faCalendarCheck, faCalendarDay, faCalendarMinus, faCalendarPlus, faCalendarTimes, faCalendarWeek,
               faCamera, faCameraRetro, faCampground, faCandyCane, faCannabis, faCapsules, 

               faCar, faCarAlt, faCarBattery, faCarCrash, faCaretDown, faCaretLeft, 
               faCaretRight, faCaretSquareDown, faCaretSquareLeft, faCaretSquareRight, faCaretSquareUp, faCaretUp, 
               faCarrot, faCarSide, faCartArrowDown, faCartPlus, faCashRegister, faCat, 
               faCertificate, faChair, faChalkboard, faChalkboardTeacher, faChargingStation, faChartArea,

               faCoffee, faDiagnoses,
               faUserSecret, }                       from '@fortawesome/free-solid-svg-icons'
     import {FontAwesomeIcon}                        from '@fortawesome/vue-fontawesome'

     library.add(faAd, faAddressBook, faAddressCard, faAdjust, faAirFreshener)                                     //* 1, 2, 3, 4, 5
     library.add(faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight, faAllergies)                            //* 6, 7, 8, 9, 10
     library.add(faAmbulance, faAmericanSignLanguageInterpreting, faAnchor, faAngleDoubleDown, faAngleDoubleLeft)  //* 11, 12, 13, 14, 15                                 //* 1
     library.add(faAngleDoubleRight, faAngleDoubleUp, faAngleDown, faAngleLeft, faAngleRight)                      //* 16, 17, 18, 19, 20
     library.add(faAngleUp, faAngry, faAnkh, faAppleAlt, faArchive)                                                //* 21, 22, 23, 24, 25
     library.add(faArchway, faArrowAltCircleDown, faArrowAltCircleLeft, faArrowAltCircleRight, faArrowAltCircleUp)
     library.add(faArrowCircleDown, faArrowCircleLeft, faArrowCircleRight, faArrowCircleUp, faArrowDown)
     library.add(faArrowLeft, faArrowRight, faArrowsAlt, faArrowsAltH, faArrowsAltV)
     library.add(faArrowUp, faAssistiveListeningSystems, faAsterisk, faAt, faAtlas)
     library.add(faAtom, faAudioDescription, faAward, faBaby, faBabyCarriage)

     library.add(faBackspace, faBackward, faBacon, faBalanceScale, faBan)
     library.add(faBandAid, faBarcode, faBars, faBaseballBall, faBasketballBall)
     library.add(faBath, faBatteryEmpty, faBatteryFull, faBatteryHalf, faBatteryQuarter)
     library.add(faBatteryThreeQuarters, faBed, faBeer, faBell, faBellSlash)
     library.add(faBezierCurve, faBible, faBicycle, faBinoculars, faBiohazard)

     library.add(faBirthdayCake, faBlender, faBlenderPhone, faBlind, faBlog)
     library.add(faBold, faBolt, faBomb, faBone, faBong)
     library.add(faBook, faBookDead, faBookmark, faBookMedical, faBookOpen)
     library.add(faBookReader, faBowlingBall, faBox, faBoxes, faBoxOpen)
     library.add(faBraille, faBrain, faBreadSlice, faBriefcase, faBriefcaseMedical)

     library.add(faBroadcastTower, faBroom, faBrush, faBug, faBuilding)
     library.add(faBullhorn, faBullseye, faBurn, faBus, faBusAlt)
     library.add(faBusinessTime, faCalculator, faCalendar, faCalendarAlt, faCalendarCheck)
     library.add(faCalendarDay, faCalendarMinus, faCalendarPlus, faCalendarTimes, faCalendarWeek)
     library.add(faCamera, faCameraRetro, faCampground, faCandyCane, faCannabis)

     library.add(faCapsules, faCar, faCarAlt, faCarBattery, faCarCrash)
     library.add(faCaretDown, faCaretLeft, faCaretRight, faCaretSquareDown, faCaretSquareLeft)
     library.add(faCaretSquareRight, faCaretSquareUp, faCaretUp, faCarrot, faCarSide)
     library.add(faCartArrowDown, faCartPlus, faCashRegister, faCat, faCertificate)
     library.add(faChair, faChalkboard, faChalkboardTeacher, faChargingStation, faChartArea)

     library.add(faCoffee)                             //* 21
     library.add(faDiagnoses)                          //* 22
     library.add(faUserSecret)                         //* 23

     export default {
          name: 'boton',
          props: ['icono','descripcion'],
          components: {
               fontawesomeicon: FontAwesomeIcon,
          },
     }
</script>

