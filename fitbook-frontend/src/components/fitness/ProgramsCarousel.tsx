import { Box, useMediaQuery } from "@chakra-ui/react";
import { useEmblaCarousel } from "embla-carousel/react";
import NextLink from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMyProgramsQuery } from "../../generated/graphql";
import ProgramCard from "./ProgramCard";


const PrevButton = ({ enabled, onClick }) => (
    <button
        className="embla__button embla__button--prev"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
            <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
        </svg>
    </button>
);

const NextButton = ({ enabled, onClick }) => (
    <button
        className="embla__button embla__button--next"
        onClick={onClick}
        disabled={!enabled}
    >
        <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
            <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
        </svg>
    </button>
);
const useInfiniteScroll = (embla, slides: any, hasMoreToLoad) => {
    const scrollListener = useRef(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [pointerIsDown, setPointerIsDown] = useState(false);

    const setPointerDown = useCallback(() => setPointerIsDown(true), []);
    const setPointerNotDown = useCallback(() => setPointerIsDown(false), []);

    const lastSlideIsInView = useCallback(() => {
        if (!embla) return false;
        const lastSlide = embla.scrollSnapList().length - 1;
        return embla.slidesInView().indexOf(lastSlide) !== -1;
    }, [embla]);

    const onScroll = useCallback(() => {
        if (!embla) return;
        setLoadingMore((isLoadingMore) => {
            if (isLoadingMore) return true;
            const shouldLoadMore = lastSlideIsInView();
            if (shouldLoadMore) embla.off("scroll", scrollListener.current);
            return shouldLoadMore;
        });
    }, [embla, setLoadingMore, lastSlideIsInView]);

    const addScrollListener = useCallback(() => {
        if (!embla || !hasMoreToLoad) return;
        scrollListener.current = () => onScroll();
        embla.on("scroll", scrollListener.current);
    }, [embla, hasMoreToLoad, onScroll]);

    const reloadEmbla = useCallback(() => {
        if (!embla) return;
        const oldEngine = embla.dangerouslyGetEngine();
        embla.reInit();
        const newEngine = embla.dangerouslyGetEngine();
        const propsToCopy = ["scrollBody", "location", "target"];
        propsToCopy.forEach((p) => Object.assign(newEngine[p], oldEngine[p]));
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();
        setLoadingMore(false);
    }, [embla]);

    useEffect(() => {
        if (!embla || slides?.length === embla.slideNodes().length - 1) return;
        const engine = embla.dangerouslyGetEngine();
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
    }, [embla, slides]);

    useEffect(() => {
        if (!embla || !hasMoreToLoad || pointerIsDown) return;
        if (slides?.length === embla.slideNodes().length - 1) return;
        reloadEmbla();
        addScrollListener();
    }, [
        embla,
        slides,
        pointerIsDown,
        hasMoreToLoad,
        reloadEmbla,
        addScrollListener
    ]);

    useEffect(() => {
        if (!embla || hasMoreToLoad) return;
        if (slides?.length === embla.slideNodes().length) return;
        if (pointerIsDown && !lastSlideIsInView()) return;
        reloadEmbla();
        embla.off("pointerDown", setPointerDown);
        embla.off("pointerUp", setPointerNotDown);
    }, [
        embla,
        slides,
        hasMoreToLoad,
        pointerIsDown,
        setPointerDown,
        setPointerNotDown,
        reloadEmbla,
        lastSlideIsInView
    ]);

    useEffect(() => {
        if (!embla) return;
        embla.on("pointerDown", setPointerDown);
        embla.on("pointerUp", setPointerNotDown);
        addScrollListener();
    }, [embla, setPointerDown, setPointerNotDown, addScrollListener]);

    return loadingMore;
};

const EmblaCarousel = () => {
    const [isLargerThan600] = useMediaQuery("(min-width:600px)");
    const { data, loading } = useMyProgramsQuery();
    const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [viewportRef, embla] = useEmblaCarousel({
        dragFree: true,
        inViewThreshold: 0,
        containScroll: "trimSnaps",
        selectedClass: "",
        draggingClass: "",
        draggableClass: ""
    });
    const loadingMore = useInfiniteScroll(embla, data, hasMoreToLoad);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);


    useEffect(() => {
        if (!embla) return;
        embla.on("select", onSelect);
        embla.on("reInit", onSelect);
        onSelect();
    }, [embla, onSelect]);

    return (
        <div style={{ marginTop: -15 }} className="embla">
            <div className="embla__viewport" ref={viewportRef}>
                <div className="embla__container">
                    {data?.myPrograms.map((program) => (
                        <NextLink key={program.id} href="/workout/programs/[id]" as={`/workout/programs/${program.id}`}>
                            <div className="embla__slide" key={program.id}>
                                <div className="embla__slide__inner">
                                    <div className="embla__slide">
                                        <div className="embla__slide__inner">
                                            <ProgramCard
                                                creator={program.creator.username}
                                                programName={program.programName}
                                                programCategory={program.programCategory}
                                                isShared={program.isShared}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NextLink>
                    ))}
                    {hasMoreToLoad && (
                        <div className="embla__slide embla__slide--loading">
                            <div className="embla__slide__inner embla__slide__inner--loading">
                                {loadingMore && <div className="embla__slide__loading" />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isLargerThan600 ? <Box>
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </Box> : null}
        </div>
    );
};

export default EmblaCarousel;
