import { create, tsx } from '@dojo/framework/core/vdom';
import UsesTemplate from '../../templates/uses/Uses';

import * as css from './Uses.m.css';

const factory = create();

export default factory(function Home() {
    return (
        <div classes={[ css.root ]}>
            <UsesTemplate />
        </div>
    )
});
