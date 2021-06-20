import BubbleIcon from "./components/icons/bubble";
import BriefcaseIcon from "./components/icons/briefcase";
import FireIcon from "./components/icons/fire";
import NewspaperIcon from "./components/icons/newspaper";
import SparklesIcon from "./components/icons/sparkles";
import Ico from "./components/icons/zap";

const site = {
  tabs: [
    { title: "Top", href: "/", icon: <FireIcon /> },
    { title: "New", href: "/new", icon: <NewspaperIcon /> },
    { title: "Ask", href: "/ask", icon: <BubbleIcon /> },
    { title: "Show", href: "/show", icon: <SparklesIcon /> },
    { title: "Job", href: "/job", icon: <BriefcaseIcon /> },
    { title: "Add Post", href: "/add", icon: <Ico /> },
  ],
};

export default site;
