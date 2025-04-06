'use client';

import React, { useRef } from 'react';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import styles from './BoldTitle.module.scss';
import Container from "@/components/UI/Layout/Layout";
import TextReveal from "@/components/UI/Elements/TextReveal/TextReveal";
import Blobs from "@/components/UI/Elements/Blobs/Blobs";

export default function BoldTitle() {
    const boldTitle = useRef();
    const boldTitleLeft = useRef();
    const boldTitleRight = useRef();

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        const splitTextLeft = new SplitText(boldTitleLeft.current, {
            type: 'chars',
        });
        const splitTextRight = new SplitText(boldTitleRight.current, {
            type: 'chars',
        });


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: boldTitle.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });

        // BoldText
        tl.fromTo(boldTitleLeft.current, {
            xPercent: -50,
        }, {
            xPercent: -10,
        }, 0);
        tl.fromTo(boldTitleRight.current, {
            xPercent: 50,
        }, {
            xPercent: 10,
        }, 0);

    });

    return(

        <section className={styles.section}>
            <Container className={styles.grid}>
                <TextReveal className={styles.paragraph}>
                    I&apos;m currently pursuing B.Tech in Computer Science with a specialization in Health Informatics from Vellore Institute of Technology, while exploring various techs through hands-on projects.
                </TextReveal>
                <h2 className={styles.boldTitle} ref={boldTitle}>
                    <span className={styles.boldTitleLeft} ref={boldTitleLeft}>Dream</span>
                    <span>Develop</span>
                    <span className={styles.boldTitleRight} ref={boldTitleRight}>Deploy</span>
                </h2>
                <TextReveal className={`${styles.paragraph} ${styles.paragraphAlt}`}>
                When I’m not buried in code, you’ll find me vibing to music, binge-watching movies or late-night sitcoms, and falling down internet rabbit holes—basically, I live on my PC (and no, I don’t need sunlight).
                </TextReveal>

                <Blobs type={'v3'} classVariable={styles.blob} />
            </Container>
        </section>

    );
}