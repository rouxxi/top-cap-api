-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.games (
                              id uuid NOT NULL DEFAULT gen_random_uuid(),
                              status text NOT NULL,
                              game_mod text NOT NULL,
                              grid jsonb NOT NULL,
                              created_at timestamp with time zone NOT NULL DEFAULT now(),
                              active_team bigint,
                              is_finished boolean NOT NULL DEFAULT false,
                              winner_team_id bigint,
                              CONSTRAINT games_pkey PRIMARY KEY (id)
);
CREATE TABLE public.kings (
                              id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
                              position_x bigint NOT NULL,
                              position_y bigint NOT NULL,
                              team_id bigint,
                              game_id uuid,
                              created_at timestamp with time zone NOT NULL DEFAULT now(),
                              CONSTRAINT kings_pkey PRIMARY KEY (id),
                              CONSTRAINT kings_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id),
                              CONSTRAINT kings_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.pawns (
                              id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
                              position_x bigint NOT NULL,
                              position_y bigint NOT NULL,
                              team_id bigint NOT NULL,
                              game_id uuid,
                              created_at timestamp with time zone NOT NULL DEFAULT now(),
                              CONSTRAINT pawns_pkey PRIMARY KEY (id),
                              CONSTRAINT pawns_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id),
                              CONSTRAINT pawns_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.teams (
                              id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
                              name text NOT NULL,
                              created_at timestamp with time zone NOT NULL DEFAULT now(),
                              selected boolean NOT NULL DEFAULT false,
                              game_id uuid NOT NULL,
                              pawns_skin text NOT NULL,
                              user_id text,
                              CONSTRAINT teams_pkey PRIMARY KEY (id),
                              CONSTRAINT players_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id)
);