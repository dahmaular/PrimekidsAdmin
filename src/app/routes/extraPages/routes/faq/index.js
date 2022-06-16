import React, {useState} from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ProfileCard from 'components/ProfileCard/index';
import ContainerHeader from 'components/ContainerHeader'
import IntlMessages from 'util/IntlMessages';

const FAQ = (props) => {

  const [expanded, setExpanded] = useState(null);

  const handleChange = panel => (event, expanded) => {
    setExpanded(() => expanded ? panel : false)
  };

  return (
    <div className=" animated slideInUpTiny animation-duration-3">
      <ContainerHeader title={<IntlMessages id="sidebar.extraPages.faq"/>} match={props.match}/>
      <div className="row">
        <div className="col-lg-8 col-md-7 col-12 mb-4 mb-md-0">

          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              How does it work?
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>Using WP Age Gate Pro is pretty straight forward. There is an easy to use
                interface given under settings to apply all the settings and integrate it with
                WooCommerce products &amp; categories easily You can find a quick How to video
                about this here which explains all the setings.</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              How does one click refund policy work?
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
                you probably haven't heard of them accusamus labore sustainable VHS.</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              What if I face any trouble and need some help?
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them
                accusamus labore sustainable VHS.</p>
            </ExpansionPanelDetails>

          </ExpansionPanel>

          <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              What frequent updates do you do?
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
                you probably haven't heard of them accusamus labore sustainable VHS.</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              What frequent updates do you do?
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente
                ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them
                accusamus labore sustainable VHS.</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>

        </div>

        <div className="col-lg-4 col-md-5 col-12 animation slideInRight">
          <div className="sidebar">

            <div className="card shadow border-0 bg-white p-2">
              <form className="m-0" role="search">
                <div className="search-bar">
                  <div className="form-group">
                    <input type="search" className="form-control form-control-lg border-0"
                           placeholder="Search..."/>
                    <button className="search-icon">
                      <i className="zmdi zmdi-search zmdi-hc-lg"/>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <ProfileCard/>

            <div className="card shadow border-0 p-4">
              <h3 className="text-uppercase letter-spacing-base mb-3">Categories</h3>

              <ul className="categories-list list-unstyled">
                <li><span className="jr-link">Technology</span></li>
                <li><span className="jr-link">Branding</span></li>
                <li><span className="jr-link">Holly</span></li>
                <li className="active"><span className="jr-link">Stories</span></li>
                <li><span className="jr-link">Designing</span></li>
                <li><span className="jr-link">Programing</span></li>
              </ul>
            </div>

            <div className="card shadow border-0 p-4 mb-0">
              <h3 className="text-uppercase letter-spacing-base mb-4">Popular Articles</h3>

              <ul className="articles-section list-unstyled">
                <li className="articles">
                    <span className="article-image jr-link">
                      <img src="https://via.placeholder.com/500x330" alt="Articales Post"/>
                    </span>

                  <div className="article-description">
                    <p><span className="jr-link">English breakfast.jpeg tea with desert
                        donut</span></p>
                    <div className="meta-wrapper">
                                            <span className="meta-date">
                                                <i className="zmdi zmdi-calendar-note zmdi-hc-lg"/>
                                                25 May, 2016
                                            </span>
                    </div>
                  </div>

                </li>

                <li className="articles">
                    <span className="article-image jr-link">
                      <img src="https://via.placeholder.com/500x330" alt="Articales Post"/>
                    </span>

                  <div className="article-description">
                    <p><span className="jr-link">Two smart kids reading through tablet</span>
                    </p>
                    <div className="meta-wrapper">
                                            <span className="meta-date"><i
                                              className="zmdi zmdi-calendar-note zmdi-hc-lg"/>25 May, 2016</span>
                    </div>
                  </div>
                </li>

                <li className="articles">
                    <span className="article-image jr-link">
                      <img src="https://via.placeholder.com/500x330" alt="Articales Post"/>
                    </span>

                  <div className="article-description">
                    <p><span className="jr-link">Co-founder trying to explain his idea to his
                        employers</span></p>
                    <div className="meta-wrapper">
                                            <span className="meta-date"><i
                                              className="zmdi zmdi-calendar-note zmdi-hc-lg"/>25 May, 2016</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

