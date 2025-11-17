import { StyleSheet } from "react-native";

export const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  userContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  userInfo: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  modulesContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  moduleButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeModule: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  moduleContent: {
    alignItems: 'flex-start',
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  moduleSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  moduleStatus: {
    alignSelf: 'flex-end',
  },
  activeModuleText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signOutContainer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  signOutButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});