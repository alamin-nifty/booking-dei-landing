import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import imgAPI from "~/public/images/imgAPI";
import { useText } from "~/theme/common";
import yt from "~/youtube";
import useStyles from "./BlogBanner-Style";

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-line
  return <Zoom ref={ref} {...props} />;
});

function BlogBanner() {
  const { classes, cx } = useStyles();
  const { classes: text } = useText();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const elem = useRef(null);
  const [hide, setHide] = useState(false);

  const { t } = useTranslation("common");

  const [player, setPlayer] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  // const handleScroll = () => {
  //   if (!elem.current) {
  //     return;
  //   }
  //   const doc = document.documentElement;
  //   const elTop = elem.current.offsetTop - 200;
  //   const elBottom = elTop + elem.current?.getBoundingClientRect()?.height;
  //   if (doc.scrollTop > elTop && doc.scrollTop < elBottom) {
  //     setHide(false);
  //   } else {
  //     setHide(true);
  //   }
  // };
  const handleScroll = () => {
    if (!elem.current) {
      return;
    }
    const doc = document.documentElement;
    const elTop = elem.current.offsetTop - 200;
    const rect = elem.current.getBoundingClientRect();
    const elBottom = elTop + (rect ? rect.height : 0);
    if (doc.scrollTop > elTop && doc.scrollTop < elBottom) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  const handleClickOpen = () => {
    // if (yt.use) {
    //   setOpenPopup(true);
    //   player[0].playVideo();
    // }
  };

  const handleClose = () => {
    setOpenPopup(false);
    player[0].pauseVideo();
  };

  const _onReady = (event) => {
    player.push(event.target);
    setPlayer(player);
  };

  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 1,
      mute: 0,
      origin: "https://localhost:3002",
    },
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  // });
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={classes.root} ref={elem}>
      <Dialog
        open={openPopup}
        TransitionComponent={Transition}
        keepMounted
        classes={{ paper: classes.videoPopup }}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {t("saas-landing.video_title")}
          <IconButton
            onClick={handleClose}
            className={classes.closeBtn}
            size="large"
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {yt.use && (
            <YouTube videoId="4K6Sh1tsAW4" onReady={_onReady} opts={opts} />
          )}
        </DialogContent>
      </Dialog>
      <div className={classes.decoration}>
        <svg className={classes.leftDeco}>
          <use xlinkHref="/images/saas/deco-bg-left.svg#main" />
        </svg>
        <svg className={classes.rightDeco}>
          <use xlinkHref="/images/saas/deco-bg-right.svg#main" />
        </svg>
      </div>
      <Container fixed={isDesktop}>
        <div className={classes.sliderWrap}>
          <div className={classes.text}>
            <Typography variant="h4" className={text.title}>
              {t("saas-landing.blog_banner_title")}
            </Typography>
            <Typography component="p" className={classes.text}>
              {t("saas-landing.blog_banner_description")}
            </Typography>
            <div className={classes.btnArea}>
              <ButtonBase className={classes.playBtn} onClick={handleClickOpen}>
                <span className={classes.icon}>
                  <i className="ion-ios-play-outline" />
                </span>
                {t("saas-landing.banner_watchvideo")}
              </ButtonBase>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="/login"
              >
                {t("saas-landing.getstarted")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <div className={classes.deco}>
        {!isTablet && (
          <div className={cx(classes.decoInner, hide && classes.hide)}>
            <div className={cx(classes.wave, classes.waveOne)} />
            <div className={cx(classes.wave, classes.waveTwo)} />
          </div>
        )}
        <div className={cx(classes.wave, classes.waveCover)} />
      </div>
    </div>
  );
}

export default BlogBanner;
