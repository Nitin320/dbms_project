// src/ShootingStars.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ShootingStars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });

    // Set renderer size and background color
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1); // Dark gray background for contrast

    // Add stars
    const stars = [];
    const starCount = 200; // Number of stars
    const starGeometry = new THREE.SphereGeometry(0.15, 24, 24); // Increase the star size
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White stars

    for (let i = 0; i < starCount; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(
        (Math.random() - 0.5) * 200, // Random X position
        (Math.random() - 0.5) * 200, // Random Y position
        Math.random() * -100 // Z position
      );
      stars.push(star);
      scene.add(star);
    }

    // Animate shooting stars
    const animate = () => {
      stars.forEach((star) => {
        star.position.z += 0.5; // Move stars towards the camera
        if (star.position.z > 10) {
          star.position.z = -100; // Reset position
          star.position.x = (Math.random() - 0.5) * 200; // New random X
          star.position.y = (Math.random() - 0.5) * 200; // New random Y
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    camera.position.z = 5;
    animate();

    // Cleanup on component unmount
    return () => {
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ShootingStars;
