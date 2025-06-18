import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { styles } from '../styles/main-page-style';

export default function Sidebar(setSidebarVisible: (visible: boolean) => void) {

  return (
    <>
              {/* Full-screen overlay */}
              <Pressable
                onPress={() => setSidebarVisible(false)}
                style={styles.sidebarOverlay}
              />

              {/* Sidebar content */}
              <View style={styles.sidebarContent}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    router.push("/profile");
                    setSidebarVisible(false);
                  }}
                >
                  <Text>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    router.push("/settings");
                    setSidebarVisible(false);
                  }}
                >
                  <Text>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    router.push("/about");
                    setSidebarVisible(false);
                  }}
                >
                  <Text>About</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    router.push("/help");
                    setSidebarVisible(false);
                  }}
                >
                  <Text>Help</Text>
                </TouchableOpacity>
              </View>
            </>
  );
