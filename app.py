import streamlit as st
import os

st.set_page_config(
    page_title="Sunset Vibes",
    page_icon="🌅",
    layout="wide"
)

st.title("🌅 Welcome to Sunset Vibes")
st.markdown("""
### Share your amazing sunset moments!

This is a dedicated space for sunset lovers. 
Navigate to the pages using the sidebar:

- **👈 Upload**: To add your new sunset videos.
- **👈 Gallery**: To watch the amazing collection.

Enjoy the view! 🌇
""")

# Ensure uploads directory exists
if not os.path.exists("uploads"):
    os.makedirs("uploads")
