import BubbleIcon from "./components/icons/bubble";
import BriefcaseIcon from "./components/icons/briefcase";
import FireIcon from "./components/icons/fire";
import NewspaperIcon from "./components/icons/newspaper";
import SparklesIcon from "./components/icons/sparkles";
import Ico from "./components/icons/zap";
import LatestIco from "./components/icons/globe";

const site = {
  tabs: [
    { title: "Latest", href: "/", icon: <LatestIco style={{marginRight:"1rem"}}/> },
    { title: "Top", href: "/top", icon: <FireIcon /> },
    { title: "News", href: "/news", icon: <NewspaperIcon /> },
    { title: "Ask", href: "/ask", icon: <BubbleIcon /> },
    { title: "Show", href: "/show", icon: <SparklesIcon /> },
    { title: "Job", href: "/job", icon: <BriefcaseIcon /> },
    { title: "Add Post", href: "/add", icon: null },
    { title: "Add Subreddit", href: "/add", icon: null },
  ],
};

export default site;
