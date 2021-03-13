import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import SectionHeader from "./Header/SectionHeader";
import Searching from "../Searching";
import NotFound from "../NotFound";

const Section = ({
  name,
  single,
  get,
  href,
  view,
  hasRoundTop,
  hasInSiteLink,
}) => {
  const { login } = useParams();
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setSearching(true);
    if (single) {
      get(login, single, setSearching, setFound, setItems);
    } else {
      get(login, setSearching, setFound, setItems);
    }
  }, [login, single]);

  const sectionHeader = () => (
    <SectionHeader
      title={name}
      href={href}
      hasRoundTop={hasRoundTop}
      hasInSiteLink={hasInSiteLink}
    />
  );

  const sectionContent = () => {
    if (searching) { return <Searching />; }
    if (found) { return view(items); }
    return <NotFound page={name} />;
  };

  return (
    <div className="Section">
      {sectionHeader()}
      {sectionContent()}
    </div>
  );
};

Section.propTypes = {
  name: PropTypes.string.isRequired,
  single: PropTypes.string,
  get: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  view: PropTypes.func.isRequired,
  hasRoundTop: PropTypes.bool,
  hasInSiteLink: PropTypes.bool,
};

Section.defaultProps = {
  single: undefined,
  hasRoundTop: false,
  hasInSiteLink: false,
};

export default Section;
