'use client';

import React, {useRef, useState} from 'react';

import styles from './SkillSet.module.scss';

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";
import {InertiaPlugin} from "gsap/InertiaPlugin";
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import {ScrollTrigger} from "gsap/ScrollTrigger";

import Title from "@/components/UI/Elements/Title/Title";
import Skills from '@/database/Skills.json';
import Blobs from "@/components/UI/Elements/Blobs/Blobs";
import Image from "next/image";
import Ticker from "@/components/UI/Elements/Ticker/Ticker";

export default function SkillSet() {
    gsap.registerPlugin(Draggable, InertiaPlugin, MotionPathPlugin, ScrollTrigger);

    const container = useRef();
    const collisionDiv = useRef();
    const sphere = useRef();
    const [activeIndex, setActiveIndex] = useState(null);
    const [dragStatus, setDragStatus] = useState(null);

    // GSAP Animations
    useGSAP(() => {
        const boxes = gsap.utils.toArray(`.${styles.box}`);

        const handleResize = () => {
            // MotionPath
            gsap.set(boxes, {
                motionPath: {
                    path: "#circularCarouselPath",
                    align: "#circularCarouselPath",
                    alignOrigin: [0.5, 0.5],
                    start: -0.25,
                    end: (i) => i / boxes.length - 0.25,
                    autoRotate: true
                }
            });
        };

        // Draggable
        setActiveIndex(0);
        Draggable.create(`.${styles.circularCarousel}`, {
            type: "rotation",
            inertia: true,
            snap: (endVal) => gsap.utils.snap(360 / boxes.length, endVal),
            onPress: () => {
                setDragStatus('pressed');
            },
            onRelease: () => {
                setDragStatus(null);
            },
            onDragStart: () => {
                setActiveIndex(null);
            },
            onThrowComplete: () => {
                let collisionDivRect = collisionDiv.current?.getBoundingClientRect();
                let newActiveIndex = null;

                boxes.forEach((box, index) => {
                    let boxRect = box.getBoundingClientRect();
                    if (
                        collisionDivRect.x < boxRect.x + boxRect.width &&
                        collisionDivRect.x + collisionDivRect.width > boxRect.x &&
                        collisionDivRect.y < boxRect.y + boxRect.height &&
                        collisionDivRect.y + collisionDivRect.height > boxRect.y
                    ) {
                        newActiveIndex = index;
                    }
                });
                setActiveIndex(newActiveIndex);
            },
        });

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, { scope: container });


    return (
        <>
            <section className={`${styles.section}`} id={'skills'} ref={container}>
                <div className={styles.blobs}>
                    <Blobs type={'v2'} classVariable={`${styles.blob} ${styles.blobV2}`}/>
                    <Blobs type={'v1'} classVariable={`${styles.blob} ${styles.blobV1}`}/>
                </div>
                <div className={styles.grid}>
                    <Title color={'white'}><span>My</span> <br/> Skillset</Title>
                    <div className={styles.circularCarouselWrapper}>
                        <div className={styles.collisionDiv} ref={collisionDiv}></div>
                        <div className={styles.circularCarousel}>
                            <svg viewBox="0 0 400 400">
                                <path strokeWidth="2" stroke="red" id="circularCarouselPath" fill="none"
                                      d="M396,200 C396,308.24781 308.24781,396 200,396 91.75219,396 4,308.24781 4,200 4,91.75219 91.75219,4 200,4 308.24781,4 396,91.75219 396,200 z"></path>
                            </svg>
                            {Skills.map((skill, index) => (
                                <div key={index}
                                     className={`${styles.box} ${activeIndex === index ? styles.isActive : ''}`}>
                                    <Image className={styles.image} src={skill.image} alt={skill.title} width={80}
                                           height={80}
                                           loading={'lazy'}/>
                                </div>
                            ))}
                        </div>
                        {Skills.map((skill, index) => (
                            <div key={index}
                                 className={`${styles.circularDescriptions} ${activeIndex === index ? styles.isActive : ''}`}>
                                <h2 className={styles.title}>{skill.title} <br/> {skill.subtitle}</h2>
                                <p className={styles.description}>{skill.description}</p>
                            </div>
                        ))}

                        <div className={styles.dragMe}>
                            <svg width="301" height="161" viewBox="0 0 301 161" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M215.609 128.362C215.609 130.082 214.749 132.142 213.029 134.542C211.669 137.582 210.049 142.422 208.169 149.062C207.649 150.982 207.029 152.842 206.309 154.642C204.869 158.282 202.649 160.102 199.649 160.102C196.689 160.102 194.269 159.382 192.389 157.942C190.549 156.542 189.629 155.062 189.629 153.502C189.629 153.142 189.749 152.742 189.989 152.302C190.229 151.862 190.509 151.642 190.829 151.642C191.149 151.642 191.549 151.922 192.029 152.482C192.549 153.082 193.029 153.722 193.469 154.402C193.949 155.082 194.709 155.702 195.749 156.262C196.789 156.862 197.829 157.162 198.869 157.162C199.909 157.162 200.709 156.942 201.269 156.502C201.869 156.062 202.369 155.502 202.769 154.822C203.169 154.182 203.569 153.262 203.969 152.062C204.409 150.902 204.769 149.802 205.049 148.762C206.049 145.042 206.829 142.282 207.389 140.482C203.989 143.282 201.109 144.682 198.749 144.682C196.909 144.682 195.289 143.982 193.889 142.582C192.529 141.142 191.849 139.542 191.849 137.782C191.849 135.182 192.689 132.142 194.369 128.662C196.049 125.182 198.209 122.142 200.849 119.542C203.489 116.902 205.929 115.582 208.169 115.582C210.449 115.582 212.149 116.662 213.269 118.822C214.429 120.982 215.009 123.262 215.009 125.662V126.262C215.409 126.782 215.609 127.482 215.609 128.362ZM198.569 141.142C201.009 141.142 203.589 139.882 206.309 137.362C209.069 134.842 211.189 131.622 212.669 127.702C212.389 127.222 212.149 126.462 211.949 125.422C211.469 122.222 210.809 120.282 209.969 119.602C209.609 119.282 209.149 119.122 208.589 119.122C206.869 119.122 204.949 120.282 202.829 122.602C200.709 124.922 198.929 127.582 197.489 130.582C196.049 133.542 195.329 136.022 195.329 138.022C195.329 138.942 195.649 139.702 196.289 140.302C196.929 140.862 197.689 141.142 198.569 141.142Z"
                                    fill="white"/>
                                <path
                                    d="M179.957 115.582C182.037 115.582 183.637 116.442 184.757 118.162C185.917 119.882 186.497 121.442 186.497 122.842C186.497 124.202 186.057 125.482 185.177 126.682C185.537 127.082 185.717 127.602 185.717 128.242C185.717 130.802 185.497 133.222 185.057 135.502C184.657 137.782 184.397 139.602 184.277 140.962C184.157 142.322 184.017 143.282 183.857 143.842C183.737 144.402 183.497 144.682 183.137 144.682C182.457 144.682 182.017 144.042 181.817 142.762C181.617 141.442 181.517 139.422 181.517 136.702C180.277 138.902 178.697 140.782 176.777 142.342C174.897 143.902 173.037 144.682 171.197 144.682C169.397 144.682 167.657 143.982 165.977 142.582C164.297 141.182 163.457 139.642 163.457 137.962C163.457 135.402 164.337 132.362 166.097 128.842C167.897 125.282 170.137 122.182 172.817 119.542C175.497 116.902 177.877 115.582 179.957 115.582ZM183.377 125.962C183.337 125.682 183.317 125.022 183.317 123.982C183.317 122.902 183.077 121.822 182.597 120.742C182.157 119.662 181.477 119.122 180.557 119.122C179.037 119.122 177.197 120.282 175.037 122.602C172.917 124.882 171.077 127.542 169.517 130.582C167.957 133.582 167.177 136.062 167.177 138.022C167.177 138.902 167.577 139.642 168.377 140.242C169.217 140.842 170.097 141.142 171.017 141.142C173.097 141.142 175.217 139.802 177.377 137.122C179.537 134.442 181.177 131.142 182.297 127.222C182.417 126.542 182.777 126.122 183.377 125.962Z"
                                    fill="white"/>
                                <path
                                    d="M150.41 121.402L150.29 118.162C150.29 116.802 150.39 116.042 150.59 115.882C150.79 115.682 150.99 115.582 151.19 115.582C151.75 115.582 152.31 116.002 152.87 116.842C153.43 117.682 153.71 118.582 153.71 119.542C153.71 122.102 153.49 124.662 153.05 127.222C154.25 124.702 155.53 122.542 156.89 120.742C158.25 118.902 159.51 117.622 160.67 116.902C161.83 116.182 162.87 115.822 163.79 115.822C165.55 115.822 166.43 116.182 166.43 116.902C166.43 117.422 165.81 117.942 164.57 118.462C162.21 119.382 160.31 120.822 158.87 122.782C157.43 124.702 156.01 127.202 154.61 130.282C153.21 133.322 152.13 136.042 151.37 138.442C150.65 140.842 150.11 142.522 149.75 143.482C149.39 144.442 148.93 144.922 148.37 144.922C147.93 144.922 147.55 144.642 147.23 144.082C146.91 143.522 146.75 142.982 146.75 142.462C146.75 141.902 146.87 141.182 147.11 140.302C148.23 136.622 149.05 133.482 149.57 130.882C150.13 128.242 150.41 125.082 150.41 121.402Z"
                                    fill="white"/>
                                <path
                                    d="M142.637 100.583C142.637 99.9032 142.697 99.4432 142.817 99.2032C142.937 98.9232 143.237 98.7832 143.717 98.7832C144.197 98.7832 144.717 99.2232 145.277 100.103C145.877 100.943 146.177 101.923 146.177 103.043C146.177 104.163 145.717 107.203 144.797 112.163C143.917 117.123 142.397 123.783 140.237 132.143C138.117 140.503 136.737 144.683 136.097 144.683C135.657 144.683 135.217 144.443 134.777 143.963C134.337 143.443 134.117 142.903 134.117 142.343C134.117 141.743 134.397 140.183 134.957 137.663C133.237 139.703 131.377 141.383 129.377 142.703C127.377 144.023 125.457 144.683 123.617 144.683C121.777 144.683 120.197 143.963 118.877 142.523C117.597 141.043 116.957 139.423 116.957 137.663C116.957 135.863 117.397 133.703 118.277 131.183C119.197 128.663 120.357 126.243 121.757 123.923C123.197 121.603 124.937 119.643 126.977 118.043C129.017 116.403 131.057 115.583 133.097 115.583C136.177 115.583 138.177 117.623 139.097 121.703C141.097 113.223 142.277 106.183 142.637 100.583ZM133.337 119.123C131.537 119.123 129.617 120.183 127.577 122.303C125.537 124.383 123.857 126.923 122.537 129.923C121.217 132.883 120.557 135.623 120.557 138.143C120.557 139.063 120.937 139.843 121.697 140.483C122.457 141.123 123.277 141.443 124.157 141.443C125.997 141.443 128.337 140.183 131.177 137.663C134.377 134.783 136.477 131.603 137.477 128.123C137.477 125.563 137.117 123.423 136.397 121.703C135.677 119.983 134.657 119.123 133.337 119.123Z"
                                    fill="white"/>
                                <path
                                    d="M11.1461 88.6843C9.95479 78.9612 16.2324 69.7563 23.28 63.705C31.0828 56.9747 40.7381 52.7305 50.9072 51.0509C71.4774 47.5487 91.9654 54.1275 110.36 62.8502C121.814 68.2751 132.674 74.8133 142.998 82.2148C143.957 82.9045 143.869 84.666 143.161 85.4223C142.269 86.3989 140.912 86.2749 139.954 85.5853C131.201 79.3491 122.021 73.8035 112.412 68.9485C103.619 64.5511 94.5827 60.6241 85.1245 57.9173C66.7262 52.8247 46.1002 52.9468 29.9396 64.2953C22.3381 69.621 14.5308 78.5948 15.7878 88.5976C15.8958 89.8115 14.7243 90.8538 13.5877 90.9141C12.1237 90.9628 11.2541 89.8982 11.1461 88.6843Z"
                                    fill="white"/>
                                <path
                                    d="M138.333 47.636C140.311 59.3283 142.289 71.0206 144.268 82.7129C144.686 85.1228 145.658 88.2583 143.327 90.0155C142.185 90.9328 140.721 90.9815 139.239 90.8278C137.757 90.6742 136.352 90.4728 134.823 90.2419C128.925 89.5023 123.057 88.6377 117.159 87.8981C110.511 86.9806 103.91 86.1403 97.2622 85.2227C96.0599 85.0034 95.3269 83.6412 95.5939 82.5162C95.8905 81.2663 97.0981 80.6287 98.3004 80.848C109.115 82.2922 119.929 83.7363 130.618 85.1509C133.379 85.4762 136.111 85.9265 138.873 86.2518C139.2 86.2634 140.009 86.1914 140.354 86.4054C140.652 86.5421 140.384 86.2804 140.325 86.5304C140.242 87.435 140.093 86.6734 140.093 86.6734C140.045 86.5961 139.937 85.3821 139.89 85.3048C139.74 84.5432 139.639 83.8589 139.489 83.0973C138.569 77.7956 137.726 72.4463 136.758 67.0672C135.688 61.0039 134.696 54.893 133.626 48.8297C133.393 47.5861 133.94 46.3955 135.213 46.0375C136.582 45.8342 138.147 46.4698 138.333 47.636Z"
                                    fill="white"/>
                                <path
                                    d="M300.29 125.062C300.29 127.142 299.23 128.802 297.11 130.042C294.99 131.242 292.55 131.842 289.79 131.842C287.03 131.842 284.13 131.462 281.09 130.702C280.45 132.742 280.13 134.562 280.13 136.162C280.13 137.762 280.69 139.022 281.81 139.942C282.93 140.822 284.41 141.262 286.25 141.262C288.09 141.262 290.05 140.882 292.13 140.122C294.21 139.362 295.39 138.982 295.67 138.982C296.39 138.982 296.75 139.302 296.75 139.942C296.75 140.742 295.57 141.742 293.21 142.942C290.85 144.102 288.69 144.682 286.73 144.682C283.97 144.682 281.61 143.822 279.65 142.102C277.73 140.342 276.77 138.082 276.77 135.322C276.77 132.522 277.49 129.582 278.93 126.502C280.37 123.422 282.25 120.842 284.57 118.762C286.89 116.642 289.17 115.582 291.41 115.582C293.69 115.582 295.73 116.642 297.53 118.762C299.37 120.842 300.29 122.942 300.29 125.062ZM291.89 118.942C290.09 118.942 288.29 119.822 286.49 121.582C284.73 123.342 283.27 125.542 282.11 128.182C284.43 128.742 286.73 129.022 289.01 129.022C291.33 129.022 293.21 128.642 294.65 127.882C296.13 127.082 296.87 126.062 296.87 124.822C296.87 123.542 296.33 122.242 295.25 120.922C294.17 119.602 293.05 118.942 291.89 118.942Z"
                                    fill="white"/>
                                <path
                                    d="M268.897 115.583C269.937 115.583 270.897 116.303 271.777 117.743C272.657 119.183 273.098 121.403 273.098 124.403C273.098 127.363 272.237 131.483 270.517 136.763C268.837 142.043 267.297 144.683 265.897 144.683C265.257 144.683 264.938 144.283 264.938 143.483C264.938 142.683 265.317 141.283 266.077 139.283C266.877 137.243 267.678 134.843 268.478 132.083C269.278 129.283 269.677 126.503 269.677 123.743C269.677 120.983 269.157 119.603 268.117 119.603C267.517 119.603 266.957 119.823 266.438 120.263C265.918 120.703 265.497 121.083 265.177 121.403C264.857 121.723 264.458 122.203 263.978 122.843C263.538 123.483 263.137 124.043 262.777 124.523C262.417 125.003 261.937 125.703 261.337 126.623C260.737 127.543 260.217 128.323 259.777 128.963C259.377 129.603 258.797 130.523 258.037 131.723C257.317 132.883 256.738 133.783 256.298 134.423C255.858 135.063 255.157 136.303 254.197 138.143C251.957 142.503 250.518 144.683 249.878 144.683C249.558 144.683 249.217 144.483 248.857 144.083C248.497 143.683 248.317 143.263 248.317 142.823C248.317 142.343 248.598 141.383 249.158 139.943C249.718 138.503 250.338 136.983 251.018 135.383C251.738 133.783 252.377 131.823 252.938 129.503C253.498 127.183 253.777 125.003 253.777 122.963C253.777 122.043 253.498 121.263 252.938 120.623C252.418 119.943 251.957 119.603 251.557 119.603C251.157 119.603 250.797 119.663 250.477 119.783C250.197 119.903 249.878 120.123 249.518 120.443C249.158 120.723 248.817 121.043 248.497 121.403C248.177 121.723 247.778 122.183 247.298 122.783C246.858 123.383 246.437 123.943 246.037 124.463C245.677 124.983 245.218 125.683 244.658 126.563C244.098 127.403 243.578 128.163 243.098 128.843C242.658 129.523 242.077 130.423 241.357 131.543C240.637 132.663 239.917 133.743 239.197 134.783C238.517 135.823 237.597 137.283 236.438 139.163C234.158 142.843 232.878 144.683 232.598 144.683C232.158 144.683 231.678 144.403 231.158 143.843C230.678 143.243 230.438 142.763 230.438 142.403C230.438 142.003 230.477 141.563 230.557 141.083C230.677 140.603 230.837 140.003 231.037 139.283C231.237 138.523 231.437 137.783 231.637 137.063C232.237 135.263 232.877 133.163 233.557 130.763C234.237 128.323 234.698 125.743 234.938 123.023C235.218 120.263 235.377 118.323 235.417 117.203C235.497 116.083 235.777 115.523 236.257 115.523C236.817 115.523 237.377 115.903 237.938 116.663C238.498 117.383 238.777 118.163 238.777 119.003C238.777 123.283 237.338 129.543 234.458 137.783C239.298 129.263 242.938 123.443 245.378 120.323C247.858 117.163 250.057 115.583 251.977 115.583C252.897 115.583 253.977 116.363 255.217 117.923C256.457 119.443 257.077 121.143 257.077 123.023C257.077 124.863 256.657 127.223 255.817 130.103C258.857 124.663 261.358 120.883 263.318 118.763C265.318 116.643 267.177 115.583 268.897 115.583Z"
                                    fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div ref={sphere} className={styles.sphereWrapper}>
                    <div className={`${styles.sphere} ${dragStatus === 'pressed' ? styles.isActive : ''}`}></div>
                </div>
            </section>
            <Ticker words={['automation', 'development', 'open-source', 'design']}></Ticker>
        </>
    )
}