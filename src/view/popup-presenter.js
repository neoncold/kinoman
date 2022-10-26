import PopupSection from "./popup-section.js";
import PopupForm from "./popup-form.js";
import FormDetailsTop from "./form-details-top.js";
import FormDetailsBottom from "./form-details-bottom.js";
import FormDetailsBottomSectionWrapper from "./form-details-bottom-section-wrapper.js";
import FilmDetailsComments from "./film-details-comments.js";
import PopupCommentsList from "./popup-comments-list.js";
import FilmDetailsComment from "./film-details-comment.js";
import FilmDetailsNewComment from "./film-details-new-comment.js";
import { render } from "../render.js";
//нужно добавить класс для рендера 
//врапера коментов, заголовка коментс,
//иначе неудобно делать презентер.

export default class PopupPresenter {

  popupSection = new PopupSection();
  popupForm = new PopupForm();
  formDetailsBottom = new FormDetailsBottom();
  formDetailsBottomSectionWrapper = new FormDetailsBottomSectionWrapper();
  popupCommentsList = new PopupCommentsList();

  init = (renderPlace) => {
    this.renderPlace = renderPlace;

    render(this.popupSection, this.renderPlace);
    render(this.popupForm, this.popupSection.getElement());
    render(new FormDetailsTop(), this.popupForm.getElement());
    render(this.formDetailsBottom, this.popupForm.getElement());
    render(this.formDetailsBottomSectionWrapper, this.formDetailsBottom.getElement());
    render(new FilmDetailsComments(), this.formDetailsBottomSectionWrapper.getElement());
    render(this.popupCommentsList, this.formDetailsBottomSectionWrapper.getElement());
    render(new FilmDetailsComment(), this.popupCommentsList.getElement());
    render(new FilmDetailsNewComment(), this.formDetailsBottomSectionWrapper.getElement());
    
    
  }
}