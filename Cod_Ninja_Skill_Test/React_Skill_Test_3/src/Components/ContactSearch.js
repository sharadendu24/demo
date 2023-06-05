import { data } from "../DummyJSON/data";
import { contacts } from "../DummyJSON/contacts";
import ContactCard from "./ContactCard";
import './ContactCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactSearch.css'

function ContactSearch({search}){


    const result = contacts.filter(check);

    function check(s) {
     return s.name.startsWith(search);
    }



    return(
        <div class="cols">
            <div>
                {
                (result!=''  ? result.map((item) => <ContactCard item={item}/>): <p>Not Found</p>)
                }

            </div>
            
        </div>
    )
}

export default ContactSearch;