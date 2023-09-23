CREATE OR REPLACE FUNCTION check_squad_entry_count() RETURNS TRIGGER AS $$
declare row_count integer;
BEGIN
    SELECT COUNT(*) into row_count from public.user_squad_entry se
    where se.position_id = 2 and se.team_id = NEW.team_id;
     IF row_count > (
      SELECT required_goalkeepers from public.squad_configs sc where sc.league_id = NEW.league_id)
    THEN
    RAISE EXCEPTION 'Reached maximum number of goalkeepers allowed per team %', NEW;
  END IF;

    SELECT COUNT(*) into row_count from public.user_squad_entry se
    where se.position_id = 1 and se.team_id = NEW.team_id;
     IF row_count > (
      SELECT required_defenders from public.squad_configs sc where sc.league_id = NEW.league_id)
     THEN
    RAISE EXCEPTION 'Reached maximum number of defenders allowed per team %', NEW;
  END IF;

    SELECT COUNT(*) into row_count from public.user_squad_entry se
    where se.position_id = 3 and se.team_id = NEW.team_id;
     IF row_count > (
      SELECT required_midfielders from public.squad_configs sc where sc.league_id = NEW.league_id)
     THEN
    RAISE EXCEPTION 'Reached maximum number of midfielders allowed per team % player_id = %', row_count, NEW.player_id;
  END IF;

    SELECT COUNT(*) into row_count from public.user_squad_entry se
    where se.position_id = 5 and se.team_id = NEW.team_id;
     IF row_count > (
      SELECT required_forwards from public.squad_configs sc where sc.league_id = NEW.league_id)
     THEN
    RAISE EXCEPTION 'Reached maximum number of forwards allowed per team %', NEW;
  END IF; 

    SELECT count(*) into row_count FROM public.user_squad_entry se
    where se.team_id = NEW.team_id and se.league_team_id = NEW.league_team_id;
   if row_count > (
      SELECT max_players_per_team from public.squad_configs sc where sc.league_id = NEW.league_id)
     THEN
    RAISE EXCEPTION 'Reached maximum number of players allowed per team %', NEW;
  END IF; 
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_count_trigger BEFORE INSERT OR UPDATE ON public.user_squad_entry FOR EACH ROW EXECUTE PROCEDURE check_squad_entry_count();