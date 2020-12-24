import { create, tsx } from '@dojo/framework/core/vdom';

const factory = create();

export default factory(function Home() {
    return (
        <div>
            <span>Home content goes here</span>
        </div>
    );
});
