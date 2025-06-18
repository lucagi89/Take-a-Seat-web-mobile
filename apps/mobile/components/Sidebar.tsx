import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { styles } from '../styles/main-page-style';

export default function Sidebar(setVisible: (visible: boolean) => void) {

  return (
    <>
              {/* Full-screen overlay */}
              <Pressable
                onPress={() => setVisible(false)}
                style={styles.sidebarOverlay}
              />

              {/* Sidebar content */}
              <View style={styles.sidebarContent}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    router.push("/profile");
                    setVisible(false);
                  }}
                >
                  <Text>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    router.push("/settings");
                    setVisible(false);
                  }}
                >
                  <Text>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    router.push("/about");
                    setVisible(false);
                  }}
                >
                  <Text>About</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    router.push("/help");
                    setVisible(false);
                  }}
                >
                  <Text>Help</Text>
                </TouchableOpacity>
              </View>
            </>
  );
