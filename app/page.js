import React from "react";
import Hero from '@/components/Blocks/Hero/Hero';
import ExperienceBlock from "@/components/Blocks/Experience/Experience";
import Resume from "@/components/Blocks/Resume/Resume";
import SkillSet from "@/components/Blocks/SkillSet/SkillSet";
import BoldTitle from "@/components/UI/Cards/BoldTitle/BoldTitle";
import Gallery from "@/components/Blocks/Gallery/Gallery";
import About from "@/components/Blocks/About/About";
import BlogPosts from "@/components/Blocks/BlogPosts/BlogPosts";
import CodepenShowcase from "@/components/Blocks/CodepenShowcase/CodepenShowcase";
import SelectedWorks from "@/components/Blocks/SelectedWorks/SelectedWorks";

export default function Home() {
    return (
        <>
            <Hero/>
            <SkillSet/>
            <ExperienceBlock/>
            <BoldTitle/>
            <Resume/>
        </>
    )
}
