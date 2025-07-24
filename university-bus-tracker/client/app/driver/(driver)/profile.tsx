import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useState } from 'react';

export default function Driver_Profile() {
  const [driver, setDriver] = useState({
    userID: 'DRV001',
    name: 'John Smith',
    profilePic: 'https://via.placeholder.com/150/007AFF/FFFFFF?text=JS'
  });

  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');

  const handleEditName = () => {
    setEditName(driver.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (editName.trim()) {
      setDriver({ ...driver, name: editName.trim() });
      setIsEditingName(false);
      setEditName('');
    } else {
      Alert.alert('Error', 'Name cannot be empty');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditName('');
  };

  const handleChangeProfilePic = () => {
    // For demo purposes, we'll cycle through different placeholder images
    const currentColor = driver.profilePic.includes('007AFF') ? '34C759' :
                        driver.profilePic.includes('34C759') ? 'FF3B30' :
                        driver.profilePic.includes('FF3B30') ? 'FF9500' :
                        driver.profilePic.includes('FF9500') ? '5856D6' : '007AFF';
    
    const initials = driver.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const newPic = `https://via.placeholder.com/150/${currentColor}/FFFFFF?text=${initials}`;
    
    setDriver({ ...driver, profilePic: newPic });
    
    // In a real app, you would implement image picker here
    // Example: using expo-image-picker or react-native-image-picker
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Profile</Text>
      
      <View style={styles.profileCard}>
        {/* Profile Picture Section */}
        <View style={styles.profilePicContainer}>
          <Image source={{ uri: driver.profilePic }} style={styles.profilePic} />
          <TouchableOpacity 
            style={styles.changePicButton}
            onPress={handleChangeProfilePic}
          >
            <Text style={styles.changePicText}>📷</Text>
          </TouchableOpacity>
        </View>

        {/* User ID Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.userID}>{driver.userID}</Text>
        </View>

        {/* Name Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Name:</Text>
          {isEditingName ? (
            <View style={styles.editNameContainer}>
              <TextInput
                style={styles.nameInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter name"
                placeholderTextColor="#999"
                autoFocus
              />
              <View style={styles.editButtons}>
                <TouchableOpacity 
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSaveName}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{driver.name}</Text>
              <TouchableOpacity 
                style={[styles.button, styles.editButton]}
                onPress={handleEditName}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <Text style={styles.infoText}>Profile created: Jan 2024</Text>
          <Text style={styles.infoText}>Last updated: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileCard: {
    backgroundColor: '#3a3f47',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#4a5058',
    alignItems: 'center',
  },
  profilePicContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  changePicButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3a3f47',
  },
  changePicText: {
    fontSize: 18,
  },
  infoSection: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  userID: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#25292e',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#5a6068',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  editNameContainer: {
    width: '100%',
  },
  nameInput: {
    color: '#fff',
    fontSize: 18,
    backgroundColor: '#25292e',
    borderWidth: 1,
    borderColor: '#5a6068',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  cancelButton: {
    backgroundColor: '#8E8E93',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  additionalInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
});
