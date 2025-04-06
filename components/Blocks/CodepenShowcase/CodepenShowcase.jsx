'use client';
import React from "react";
import styles from './CodepenShowcase.module.scss';

import Title from "@/components/UI/Elements/Title/Title";
import Container from "@/components/UI/Layout/Layout";
import Codepen from "@/components/UI/Cards/Codepen/Codepen";
export default function CodepenShowcase() {

    return (
        <section className={styles.section}>
            <Container>
                <header className={styles.header}>
                    <Title color="white">Codepen</Title>
                </header>
            </Container>

            <Container>
                <div className={styles.grid}>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                    <Codepen url={'https://codepen.io/...'}></Codepen>
                </div>
            </Container>
        </section>
    );
}