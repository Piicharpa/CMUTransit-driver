import { Text, View,  StyleSheet } from 'react-native';

export default function Scanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>QR Scanner Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});

// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// export default function Index() {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
//     setScanned(true);
//     Alert.alert(
//       'QR Code Scanned',
//       `สแกนสำเร็จ: ${data}`,
//       [
//         {
//           text: 'สแกนอีกครั้ง',
//           onPress: () => setScanned(false)
//         }
//       ]
//     );
//     console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   if (hasPermission === null) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>กำลังขอสิทธิ์การเข้าถึงกล้อง...</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>ไม่สามารถเข้าถึงกล้องได้</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={async () => {
//             const { status } = await BarCodeScanner.requestPermissionsAsync();
//             setHasPermission(status === 'granted');
//           }}
//         >
//           <Text style={styles.buttonText}>ขออนุญาตใหม่</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//         barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
//       />
      
//       <View style={styles.overlay}>
//         <View style={styles.unfilled} />
//         <View style={styles.row}>
//           <View style={styles.unfilled} />
//           <View style={styles.scannerFrame} />
//           <View style={styles.unfilled} />
//         </View>
//         <View style={styles.unfilled} />
//       </View>

//       <View style={styles.topOverlay}>
//         <Text style={styles.headerText}>สแกน QR Code</Text>
//         <Text style={styles.subText}>จ่อ QR Code เพื่อเริ่มการสแกน</Text>
//       </View>

//       <View style={styles.bottomOverlay}>
//         {scanned && (
//           <TouchableOpacity
//             style={styles.scanAgainButton}
//             onPress={() => setScanned(false)}
//           >
//             <Text style={styles.buttonText}>สแกนอีกครั้ง</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     position: 'relative',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   unfilled: {
//     flex: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     flex: 2,
//   },
//   scannerFrame: {
//     flex: 6,
//     aspectRatio: 1,
//     borderWidth: 2,
//     borderColor: '#fff',
//     borderRadius: 12,
//     backgroundColor: 'transparent',
//   },
//   topOverlay: {
//     position: 'absolute',
//     top: 60,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subText: {
//     fontSize: 16,
//     color: '#ccc',
//     textAlign: 'center',
//   },
//   bottomOverlay: {
//     position: 'absolute',
//     bottom: 50,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   scanAgainButton: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 30,
//     marginHorizontal: 10,
//     minWidth: 120,
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
// });