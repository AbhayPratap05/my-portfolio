"use client";

import React from 'react';
import styles from './About.module.scss';
import Title from "@/components/UI/Elements/Title/Title";
import TextReveal from "@/components/UI/Elements/TextReveal/TextReveal";
import Stats from "@/components/UI/Cards/Stats/Stats";
import ParallaxImage from "@/components/UI/ParallaxImage/ParallaxImage";

export default function About() {
    return (
        <section className={styles.section}>
            <div className={styles.grid}>

                <header className={styles.header}>
                    <Title heading={'h3'} color="black"><span>I’m a</span> <br/>
                        Dream Design Deploy
                    </Title>
                    <TextReveal className={styles.description}>
                        my description.
                    </TextReveal>
                </header>

                <ParallaxImage src={"/gallery/IMG.jpg"} alt={`An image`} width={800} height={1200} className={styles.figure} />
                <ParallaxImage src={"/gallery/IMG.jpg"} alt={`An image`} width={800} height={1200} className={styles.figure} />
                <ParallaxImage src={"/gallery/IMG.jpg"} alt={`An image`} width={800} height={1200} className={styles.figure} />

                <Stats className={styles.stats} />

            </div>

            <div className={styles.grid}>
                <header className={styles.header}>
                    <TextReveal className={styles.description}>
                        I&apos;ve worked in UI design and front-end development, so I can understand designs well and help the team communicate effectively.
                    </TextReveal>
                </header>
                <ParallaxImage src={"/gallery/IMG.jpg"} alt={`An image`} width={800} height={1200} className={styles.figure} />
                <ParallaxImage src={"/gallery/.JPG"} alt={`An image`} width={800} height={1200} className={styles.figure} />
                <ParallaxImage src={"/gallery/.jpg"} alt={`An image`} width={800} height={1200} className={styles.figure} />
                <ParallaxImage src={"/gallery/.jpg"} alt={`An image`} width={800} height={1200} className={styles.figure} />
            </div>

            <div className={styles.grid}>
                <header className={styles.header}>
                    <TextReveal className={styles.description}>
                        Currently, I live in Uttarakhand and I like to listen to music and watch sit-coms.
                    </TextReveal>
                </header>
                <ParallaxImage src={"/gallery/IMG.jpg"} alt={`An image`} width={800} height={1200} className={styles.figure} />
                <SeattleMap className={styles.map} />
                <ParallaxImage src={"/gallery/IMG.jpg"} alt={`An image`} width={800} height={1200} className={styles.figure} />
                <ParallaxImage src={"/gallery/IMG.jpg"} alt={`An image`} width={800} height={1200} className={styles.figure} />
            </div>
        </section>
    );
}